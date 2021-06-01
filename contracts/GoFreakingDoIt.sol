pragma solidity ^0.8.4;

import "https://github.com/smartcontractkit/chainlink/blob/master/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract Bet {
    address payable owner;

    AggregatorV3Interface internal priceFeed;

    // Bet status
    enum BetStatus { LONG, SHORT, NGMI }
    
    //the game structure
    struct Game {
        uint256 betAmount;
        uint256 guess;
        BetStatus status;
        address maker;
        address taker;
        string deadline;
    }

    modifier onlyOwner() {
      require(msg.sender == owner);
      _;
    }

    receive() external payable {
    }

     /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public payable {
      priceFeed = AggregatorV3Interface(address(0x9326BFA02ADD2366b30bacB125260Af641031331));
    }

    function getThePrice() public view returns (int) {
      (
        uint80 roundID,
        int price,
        uint startedAt,
        uint timeStamp,
        uint80 answeredInRound
      ) = priceFeed.latestRoundData();

      return price;
    }
    
     event GameCreated (
        uint newGameIndex,
        uint amountBetted,
        uint guess,
        address by
    );
    
    mapping (uint256 => Game) public activeGames;

    function makeBet(uint _guess, string memory deadline) public payable returns (bytes32) {
      Game memory newGame = Game(msg.value, _guess, BetStatus(0), msg.sender, address(0), deadline);
      uint current_price = uint(getThePrice());
      
      if (_guess > current_price) {
        newGame.status = BetStatus.LONG;
      } else if (_guess < current_price) {
        newGame.status = BetStatus.SHORT;
      } else {
        newGame.status = BetStatus.NGMI;
      }
      
      bytes32 hash = keccak256(abi.encodePacked(msg.sender, msg.value, _guess, deadline, newGame.status));
      activeGames[uint256(hash)] = newGame;
      // activeGames.push(newGame);
    
      // index = index + 1;
      // activeGames.push(newGame);
      // emit GameCreated(newGame.index, msg.value, _guess, msg.sender);
      
      return hash;
    }

    function takeBet(uint256 _hash) public payable {
        //requires the taker to make the same bet amount
        Game memory game = activeGames[_hash];
        
        require(msg.value == game.betAmount);
        
        game.taker = msg.sender;
    }

    function getBetOutcome(uint256 _hash) public payable {
      // TODO: remove game from activeGames map here
      // TODO: insert asserts

      uint current_price = uint(getThePrice());
      Game memory activeGame = activeGames[_hash];
      
      if (activeGame.status == BetStatus(0) && current_price >= activeGame.guess) {
        (bool sent, bytes memory data) = activeGame.maker.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
        
      } else if (activeGame.status == BetStatus(1) && current_price <= activeGame.guess) {
          
        (bool sent, bytes memory data) = activeGame.maker.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
        
      } else {
          
        (bool sent, bytes memory data) = activeGame.taker.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
      }
    }

    function getBalance() public view returns (uint balance) {
      return address(this).balance;
    }
}
