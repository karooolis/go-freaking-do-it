import React from 'react';

const HowItWorks = () => (
	<div id="how-it-works" className="container">
		<div className="row">
			<div className="col-xs-12">
				<h2>How It Works <span role="img" aria-label="book">📖</span></h2>
			</div>

			<div className="col-xs-12 col-md-10 col-md-push-1">
				<p><b><a href="https://rinkeby.etherscan.io/address/0xb08fa94bc5245f8f4f708c9f5eed5bf88ecb5241" target="_blank" rel="noopener noreferrer">Go Freaking Do It</a></b> runs as an Ethereum smart contract 📋 where the whole idea is to establish a contract between yourself and the application to achieve a certain goal. The outcome of the smart contract is determined by a delegated 3rd party, in this case the delegated supervisor such as your friend.</p>

				<p>Keep in mind that for now it only runs on test <b><a href="https://rinkeby.etherscan.io/address/0xb08fa94bc5245f8f4f708c9f5eed5bf88ecb5241" target="_blank" rel="noopener noreferrer">Rinkeby network</a></b> and only acts as a social experiment.</p>

				<p>All users' goals are stored on Ethereum blockchain and can be publicly verified by anyone <span role="img" aria-label="people">👥</span>.</p>

				<p>All goals are checked periodically to check the status of the goal. If deadline time has arrived, supervisor <span role="img" aria-label="judge">👨‍⚖️</span> will be emailed <span role="img" aria-label="emaik">✉️</span> to confirm whether you reached your goal. Supervisor's response, or lack of it, will determine whether the goal has been reached.</p>

				<p>Upon supervisor's response <b><a href="https://rinkeby.etherscan.io/address/0xb08fa94bc5245f8f4f708c9f5eed5bf88ecb5241" target="_blank" rel="noopener noreferrer">Go Freaking Do It</a></b> smart contract will automatically send your funds back if you reached your goal <span role="img" aria-label="happy">🎉</span>, and will keep the funds otherwise <span role="img" aria-label="sad">😭</span>.</p> 

				<p>You may interact with the contract via Application Binary Interface (ABI) and verify it on <b><a href="https://rinkeby.etherscan.io/address/0xb08fa94bc5245f8f4f708c9f5eed5bf88ecb5241#code" target="_blank" rel="noopener noreferrer">Rinkeby Etherscan</a></b>.</p>

				<p>Get involved in the discussion about the project on <b><a href="https://news.ycombinator.com/item?id=15843738" target="_blank" rel="noopener noreferrer">Hacker News</a></b> thread. You may also find all the code on <b><a href="https://github.com/superkarolis/go-freaking-do-it" target="_blank" rel="noopener noreferrer">GitHub</a></b>. Feel free to improve it. As it was set up as a weekened project, there are many areas of improvement 😊.</p>
			</div>
		</div>
	</div>
)

export default HowItWorks;
