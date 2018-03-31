var HDWalletProvider = require("truffle-hdwallet-provider");
var keys = require('./keys');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id,
      gas: 4612388
    },
    rinkeby: {
      provider: new HDWalletProvider(
          keys.mnemonic,
          'https://rinkeby.infura.io/7Vjiw3k5GuN1jSfQ0Za0'
      ),
    	network_id: 4
    }
  }
};
