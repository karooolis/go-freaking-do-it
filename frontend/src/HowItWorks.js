import React from 'react';

const HowItWorks = () => (
	<div id="how-it-works" className="container">
		<div className="row">
			<div className="col-xs-12">
				<h2>How It Works</h2>
			</div>

			<div className="col-xs-12 col-md-10 col-md-push-1">
				<p><b>"Go Freaking Do It"</b> runs as an Ethereum smart contract making it ideal for applications like this where essentially you establish a contract between yourself and the application to achieve a certain goal. The outcome of the smart contract is determined by a 3rd party, in this case the delegeted supervisor which most likely will be your friend.</p>

				<p>All users' goals are stored on Ethereum blockchain and can be publicly verified by anyone.</p>

				<p>All goals are checked periodically to check the status of the goal. If deadline time has arrived, supervisor will be emailed to confirm whether you reached your goal. Supervisor's response, or lack of it, will determine whether the goal has been reached.</p>

				<p>Upon supervisor's response <b>"Go Freaking Do It"</b> smart contract will automatically send your funds back if you reached your goal, and will keep the funds otherwise.</p> 

				<p>You may interact with <b>"Go Freaking Do It"</b> smart directly by using Application Binary Interface (ABI).</p>

				<p>Note that this is mostly an experimental project but your funds are handled in a verifiably safe manner through Ethereum blockchain.</p>
			</div>
		</div>
	</div>
)

export default HowItWorks;
