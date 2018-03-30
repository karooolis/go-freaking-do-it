var Migrations = artifacts.require("./Migrations.sol");
var GoFreakingDoIt = artifacts.require("./GoFreakingDoIt.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(GoFreakingDoIt);
};
