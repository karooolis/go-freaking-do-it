pragma solidity ^0.4.15;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract GoFreakingDoIt is Ownable {
    struct Goal {
        bytes32 hash;
        address owner;
        string description;
        uint amount;
        string supervisorEmail;
        string creatorEmail;
        string deadline;
        bool emailSent;
        bool completed;
    }

    mapping (bytes32 => Goal) public goals;
    Goal[] public activeGoals;

    event setGoalEvent (
        address _owner,
        string _description,
        uint _amount,
        string _supervisorEmail,
        string _creatorEmail,
        string _deadline,
        bool _emailSent,
        bool _completed
    );

    event setGoalSucceededEvent(bytes32 hash, bool _completed);
    event setGoalFailedEvent(bytes32 hash, bool _completed);

    function setGoal(string _description, string _supervisorEmail, string _creatorEmail, string _deadline) public payable returns (bytes32, address, string, uint, string, string, string) {
        require(msg.value > 0);
        require(keccak256(_description) != keccak256(""));
        require(keccak256(_creatorEmail) != keccak256(""));
        require(keccak256(_deadline) != keccak256(""));

        bytes32 hash = keccak256(msg.sender, _description, msg.value, _deadline);

        assert(keccak256(goals[hash].description) == keccak256(""));

        Goal memory goal = Goal({
            hash: hash,
            owner: msg.sender,
            description: _description,
            amount: msg.value,
            supervisorEmail: _supervisorEmail,
            creatorEmail: _creatorEmail,
            deadline: _deadline,
            emailSent: false,
            completed: false
        });

        goals[hash] = goal;
        activeGoals.push(goal);

        setGoalEvent(goal.owner, goal.description, goal.amount, goal.supervisorEmail, goal.creatorEmail, goal.deadline, goal.emailSent, goal.completed);

        return (hash, goal.owner, goal.description, goal.amount, goal.supervisorEmail, goal.creatorEmail, goal.deadline);
    }

    function getGoalsCount() public constant returns (uint count) {
        return activeGoals.length;
    }

    function setEmailSent(uint _index, bytes32 _hash) public onlyOwner {
        assert(goals[_hash].amount > 0);

        goals[_hash].emailSent = true;
        activeGoals[_index].emailSent = true;
    }

    function setGoalSucceeded(uint _index, bytes32 _hash) public onlyOwner {
        assert(goals[_hash].amount > 0);

        goals[_hash].completed = true;
        activeGoals[_index].completed = true;

        goals[_hash].owner.transfer(goals[_hash].amount);

        setGoalSucceededEvent(_hash, true);
    }

    function setGoalFailed(uint _index, bytes32 _hash) public onlyOwner {
        assert(goals[_hash].amount > 0);

        goals[_hash].completed = false;
        activeGoals[_index].completed = false;

        owner.transfer(goals[_hash].amount);

        setGoalFailedEvent(_hash, false);
    }

    function() public payable {}

    function kill() public onlyOwner { 
        selfdestruct(owner);
    }
}
