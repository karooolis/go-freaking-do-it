// Contract to be tested
var GoFreakingDoIt = artifacts.require("./GoFreakingDoIt.sol");

// Test suite
contract('GoFreakingDoIt', function(accounts) {
  var GoFreakingDoItInstance;
  var owner = accounts[0];
  var user = accounts[1];
  var user2 = accounts[2];
  var user3 = accounts[3];

  var goal = {
  	description: 'Finish Ethereum dApp',
  	amount: 2.2222,
  	supervisorEmail: 'hello@karolisram.com',
  	creatorEmail: 'kaaarolis.r@gmail.com',
    deadline: '2017-12-12'
  }

  var goal2 = {
    description: 'Do laundry',
    amount: 11.11111,
    supervisorEmail: 'supervisor@karolisram.com',
    creatorEmail: 'creator@gmail.com',
    deadline: '2017-12-30'
  }

  var userBalanceBeforeGoal, userBalanceAfterGoal;
  var contractBalanceBeforeGoal, contractBalanceAfterGoal;
  var ownerBalanceBeforeGoal, ownerBalanceAfterGoal;

  it("should have 0 active goals", function() {
    return GoFreakingDoIt.deployed().then(function(instance) {
      GoFreakingDoItInstance = instance;
      return instance.getGoalsCount();
    }).then(function(data) {
      assert.equal(data, 0, "number of active goals must be zero");
    });
  });

  it("should let save a goal", function() {
    return GoFreakingDoIt.deployed().then(function(instance) {
      userBalanceBeforeGoal = web3.fromWei(web3.eth.getBalance(user), 'ether').toNumber();
      contractBalanceBeforeGoal = web3.fromWei(web3.eth.getBalance(GoFreakingDoItInstance.address), 'ether').toNumber();
      ownerBalanceBeforeGoal = web3.fromWei(web3.eth.getBalance(owner), 'ether').toNumber();

      return instance.setGoal(goal.description, goal.supervisorEmail, goal.creatorEmail, goal.deadline, {
        value: web3.toWei(goal.amount, 'ether'),
        from: user
      });
    }).then(function(receipt) {
      assert.equal(receipt.logs[0].args._owner, user, `owner must be ${user}`);
      assert.equal(receipt.logs[0].args._description, goal.description, `goal description must be ${goal.description}`);
      assert.equal(receipt.logs[0].args._amount.toNumber(), web3.toWei(goal.amount, 'ether'), `goal amount must be ${goal.amount}`);
      assert.equal(receipt.logs[0].args._supervisorEmail, goal.supervisorEmail, `supervisorEmail must be ${goal.supervisorEmail}`);
      assert.equal(receipt.logs[0].args._creatorEmail, goal.creatorEmail, `creatorEmail must be ${goal.creatorEmail}`);
      assert.equal(receipt.logs[0].args._deadline, goal.deadline, `deadline must be ${goal.deadline}`);
      assert.equal(receipt.logs[0].args._emailSent, false, `emailSent must be false`);
      assert.equal(receipt.logs[0].args._completed, false, `completed must be false`);

      ownerBalanceAfterGoal = web3.fromWei(web3.eth.getBalance(owner), 'ether').toNumber();
      userBalanceAfterGoal = web3.fromWei(web3.eth.getBalance(user), 'ether').toNumber();

      assert.equal(web3.fromWei(web3.eth.getBalance(GoFreakingDoItInstance.address), 'ether').toNumber(), contractBalanceBeforeGoal + goal.amount, 'contract balance should increase by goal\'s amount');
      assert.equal(ownerBalanceBeforeGoal, ownerBalanceAfterGoal, 'owner balance should be the same');
      assert(userBalanceAfterGoal <= userBalanceBeforeGoal - goal.amount, 'user\'s balance should decrease by goal\'s amount');

      return GoFreakingDoItInstance.activeGoals(0);
    }).then(function(receipt) {
      assert.equal(receipt[1], user, `owner must be ${user}`);
      assert.equal(receipt[2], goal.description, `goal description must be ${goal.description}`);
      assert.equal(receipt[3].toNumber(), web3.toWei(goal.amount, 'ether'), `goal amount must be ${goal.amount}`);
      assert.equal(receipt[4], goal.supervisorEmail, `supervisorEmail must be ${goal.supervisorEmail}`);
      assert.equal(receipt[5], goal.creatorEmail, `creatorEmail must be ${goal.creatorEmail}`);
      assert.equal(receipt[6], goal.deadline, `deadline must be ${goal.deadline}`);
      assert.equal(receipt[7], false, `emailSent must be false`);
      assert.equal(receipt[8], false, `completed must be false`);
    })
  });

  it("should let save a second goal", function() {
    return GoFreakingDoIt.deployed().then(function(instance) {
      userBalanceBeforeGoal = web3.fromWei(web3.eth.getBalance(user), 'ether').toNumber();
      contractBalanceBeforeGoal = web3.fromWei(web3.eth.getBalance(GoFreakingDoItInstance.address), 'ether').toNumber();
      ownerBalanceBeforeGoal = web3.fromWei(web3.eth.getBalance(owner), 'ether').toNumber();

      return instance.setGoal(goal2.description, goal2.supervisorEmail, goal2.creatorEmail, goal2.deadline, {
        value: web3.toWei(goal2.amount, 'ether'),
        from: user
      });
    }).then(function(receipt) {
      assert.equal(receipt.logs[0].args._owner, user, `owner must be ${user}`);
      assert.equal(receipt.logs[0].args._description, goal2.description, `goal2 description must be ${goal2.description}`);
      assert.equal(receipt.logs[0].args._amount.toNumber(), web3.toWei(goal2.amount, 'ether'), `goal2 amount must be ${goal2.amount}`);
      assert.equal(receipt.logs[0].args._supervisorEmail, goal2.supervisorEmail, `supervisorEmail must be ${goal2.supervisorEmail}`);
      assert.equal(receipt.logs[0].args._creatorEmail, goal2.creatorEmail, `creatorEmail must be ${goal2.creatorEmail}`);
      assert.equal(receipt.logs[0].args._deadline, goal2.deadline, `deadline must be ${goal2.deadline}`);
      assert.equal(receipt.logs[0].args._emailSent, false, `emailSent must be false`);
      assert.equal(receipt.logs[0].args._completed, false, `completed must be false`);

      ownerBalanceAfterGoal = web3.fromWei(web3.eth.getBalance(owner), 'ether').toNumber();
      userBalanceAfterGoal = web3.fromWei(web3.eth.getBalance(user), 'ether').toNumber();

      assert.equal(web3.fromWei(web3.eth.getBalance(GoFreakingDoItInstance.address), 'ether').toNumber(), contractBalanceBeforeGoal + goal2.amount, 'contract balance should increase by goal\'s amount');
      assert.equal(ownerBalanceBeforeGoal, ownerBalanceAfterGoal, 'owner balance should be the same');
      assert(userBalanceAfterGoal <= userBalanceBeforeGoal - goal2.amount, 'user\'s balance should decrease by goal\'s amount');

      return GoFreakingDoItInstance.activeGoals(1);
    }).then(function(goal) {
      assert.equal(goal[1], user, `owner must be ${user}`);
      assert.equal(goal[2], goal2.description, `goal2 description must be ${goal2.description}`);
      assert.equal(goal[3].toNumber(), web3.toWei(goal2.amount, 'ether'), `goal2 amount must be ${goal2.amount}`);
      assert.equal(goal[4], goal2.supervisorEmail, `supervisorEmail must be ${goal2.supervisorEmail}`);
      assert.equal(goal[5], goal2.creatorEmail, `creatorEmail must be ${goal2.creatorEmail}`);
      assert.equal(goal[6], goal2.deadline, `deadline must be ${goal2.deadline}`);
      assert.equal(goal[7], false, `emailSent must be false`);
      assert.equal(goal[8], false, `completed must be false`);
    })
  });

  it("should set goal succeeded", function() {
    return GoFreakingDoIt.deployed().then(function(instance) {
      userBalanceBeforeGoal = web3.fromWei(web3.eth.getBalance(user), 'ether').toNumber();
      contractBalanceBeforeGoal = web3.fromWei(web3.eth.getBalance(GoFreakingDoItInstance.address), 'ether').toNumber();
      ownerBalanceBeforeGoal = web3.fromWei(web3.eth.getBalance(owner), 'ether').toNumber();

      return instance.activeGoals(0);
    }).then(function(goal) {
      let hash = goal[0];

      return GoFreakingDoItInstance.setGoalSucceeded(0, hash, {
        from: owner
      });
    }).then(function(receipt) {
      ownerBalanceAfterGoal = web3.fromWei(web3.eth.getBalance(owner), 'ether').toNumber();
      userBalanceAfterGoal = web3.fromWei(web3.eth.getBalance(user), 'ether').toNumber();

      assert.equal(web3.fromWei(web3.eth.getBalance(GoFreakingDoItInstance.address), 'ether').toNumber(), (contractBalanceBeforeGoal - goal.amount).toFixed(5), 'contract balance should decrease by goal\'s amount');
      assert(Math.abs(ownerBalanceBeforeGoal-ownerBalanceAfterGoal) < 0.01, 'owner balance should be the same');
      assert(Math.abs(userBalanceAfterGoal - (userBalanceBeforeGoal + goal.amount)) < 0.01, 'user\'s balance should increase by goal\'s amount');
    })
  });

  it("should set second goal failed", function() {
    return GoFreakingDoIt.deployed().then(function(instance) {
      userBalanceBeforeGoal = web3.fromWei(web3.eth.getBalance(user), 'ether').toNumber();
      contractBalanceBeforeGoal = web3.fromWei(web3.eth.getBalance(GoFreakingDoItInstance.address), 'ether').toNumber();
      ownerBalanceBeforeGoal = web3.fromWei(web3.eth.getBalance(owner), 'ether').toNumber();

      return instance.activeGoals(1);
    }).then(function(goal) {
      let hash = goal[0];

      return GoFreakingDoItInstance.setGoalFailed(1, hash, {
        from: owner
      });
    }).then(function(receipt) {
      userBalanceAfterGoal = web3.fromWei(web3.eth.getBalance(user), 'ether').toNumber();
      ownerBalanceAfterGoal = web3.fromWei(web3.eth.getBalance(owner), 'ether').toNumber();
      contractBalanceAfterGoal = web3.fromWei(web3.eth.getBalance(GoFreakingDoItInstance.address), 'ether').toNumber();

      assert(Math.abs(contractBalanceAfterGoal-(contractBalanceBeforeGoal-goal2.amount) < 0.01), 'contract balance should decrease by goal2\'s amount');
      assert(Math.abs(ownerBalanceAfterGoal-(ownerBalanceBeforeGoal+goal2.amount)) < 0.01, 'owner balance should increase by goal\'s amount');
      assert.equal(userBalanceAfterGoal, userBalanceBeforeGoal, 'user\'s balance should decrease by goal\'s amount');
    })
  });
});
