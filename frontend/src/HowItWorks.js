import React from 'react';

const HowItWorks = () => (
	<div id="how-it-works" className="container">
		<div className="row">
			<div className="col-xs-12">
				<h2>How It Works</h2>
			</div>

			<div className="col-xs-12 col-md-10 col-md-push-1">
				<p><b><a href="https://rinkeby.etherscan.io/address/0xb08fa94bc5245f8f4f708c9f5eed5bf88ecb5241" target="_blank">Go Freaking Do It</a></b> runs as an Ethereum smart contract where the whole idea is to establish a contract between yourself and the application to achieve a certain goal. The outcome of the smart contract is determined by a delegated 3rd party, in this case the delegated supervisor such as your friend.</p>

				<p>Keep in mind that for now it only runs on test <b><a href="https://rinkeby.etherscan.io/address/0xb08fa94bc5245f8f4f708c9f5eed5bf88ecb5241" target="_blank">Rinkeby network</a></b> and only acts as a social experiment.</p>

				<p>All users' goals are stored on Ethereum blockchain and can be publicly verified by anyone.</p>

				<p>All goals are checked periodically to check the status of the goal. If deadline time has arrived, supervisor will be emailed to confirm whether you reached your goal. Supervisor's response, or lack of it, will determine whether the goal has been reached.</p>

				<p>Upon supervisor's response <b><a href="https://rinkeby.etherscan.io/address/0xb08fa94bc5245f8f4f708c9f5eed5bf88ecb5241" target="_blank">Go Freaking Do It</a></b> smart contract will automatically send your funds back if you reached your goal, and will keep the funds otherwise.</p> 

				<p>You may interact with the contract via Application Binary Interface (ABI) and verify it on <b><a href="https://rinkeby.etherscan.io/address/0xb08fa94bc5245f8f4f708c9f5eed5bf88ecb5241#code" target="_blank">Rinkeby Etherscan</a></b>.</p>

				<p>Get involved in the discussion about the project on <b><a href="https://news.ycombinator.com/item?id=15843738" target="_blank">Hacker News</a></b> thread.</p>
			</div>
		</div>
	</div>
)

export default HowItWorks;
