# Go Freaking Do It

Go Freaking Do It runs as an Ethereum smart contract where the whole idea is to establish a contract between yourself and the application to achieve a certain goal. The outcome of the smart contract is determined by a delegated 3rd party, in this case the delegated supervisor such as your friend.

## Interacting with it using ABI

- `GoFreakingDoIt.deployed().then(function(instance) {app=instance;})` - get instance of the app.
- `app.setGoal("GOAL", "SUPERVISOR_EMAIL", "CREATOR_EMAIL", "DEADLINE", {value: web3.toWei(AMOUNT, 'ether')})` - create new goal.
- `app.goals[hash]` - retrieve goal by its hash.
- `app.goals(id)` - retrieve goal by its index in the goals array.

