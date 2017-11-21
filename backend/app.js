//import Eth from 'ethjs';
//import HttpProvider from 'ethjs-provider-http';
//import contract from "truffle-contract";
//import GoFuckingDoItArtifact from './GoFuckingDoIt.json';

//import Web3 from 'web3';

let Web3 = require('web3');
let contract = require('truffle-contract');
let moment = require('moment');
let fs = require('fs')

let app, account;

fs.readFile('GoFuckingDoIt.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  data = JSON.parse(data);
  initApp(data);
});



function initApp(artifact) {
  let provider = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

  //let contractInstance = new web3.eth.Contract(artifact.abi, '0x82002f103255b870c5ad9000b04dba7146fc12f3');


  let contractInstance = contract(artifact);
  contractInstance.setProvider(provider.currentProvider);

  if (typeof contractInstance.currentProvider.sendAsync !== "function") {
    contractInstance.currentProvider.sendAsync = function() {
      return contractInstance.currentProvider.send.apply(
        contractInstance.currentProvider, arguments
      );
    };
  }

  //console.log(contractInstance);

  //contractInstance.deployed();

  contractInstance.deployed().then(appInstance => {
    app = appInstance;
    app.getGoalsCount().then(numGoals => {
      numGoals = parseInt(numGoals.c[0]);
      getActiveGoals(contractInstance, numGoals);
    });
  });

  provider.eth.getAccounts((err, acc) => {
    console.log(acc);
    if (err === null) {
      account = acc[1];
    }
  });
}

function getActiveGoals(contractInstance, numGoals) {
  for (let i = 0; i < numGoals; i++) {
    app.activeGoals(i).then(goal => {
      console.log(goal);

      checkIfShouldSendEmail(goal, i);
    });
  }
}

function checkIfShouldSendEmail(goal, idx) {
  let now = new moment().utc();
  let deadline = new moment(goal[6], "YYYY-MM-DD H:mm:ss");

  if (deadline.diff(now) < 0 && goal[7] === false) {
    // SEND EMAIL
    
    // AFTER EMAIL SENT
    console.log(account);
    app.setEmailSent(goal[0], {from: account, gas: 100000}).then(data => {
      console.log("HAPPENED", data);
    });
  }
}















