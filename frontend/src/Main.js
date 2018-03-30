import React, { Component } from 'react';

import Eth from 'ethjs';
import contract from 'truffle-contract';
import moment from 'moment';
import momenttz from 'moment-timezone';
import scrollToElement from 'scroll-to-element';

import GoFuckingDoItArtifact from './GoFreakingDoIt.json';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      amount: '',
      supervisor: '',
      creatorEmail: '',
      deadline: moment().add(14, 'days').format("YYYY-MM-DD"),
      step: 1,
      metamaskEnabled: true,
      txHash: '',
      focused: false,
      valueSet: false
    };

    this.goals = [
      'What\'s your goal?',
      'Finish a 5k',
      'Launch a startup',
      'Quit smoking',
      'Lose 5kg',
      'Cook everyday',
      'Quit coffee',
      'Meditate once a day',
      'Take dancing lessons',
      'Go to sleep early',
      'Save $1000'
    ];

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initContractInstance = this.initContractInstance.bind(this);
    this.initMetamaskAcc = this.initMetamaskAcc.bind(this);
    this.goBack = this.goBack.bind(this);
    this.writeGoal = this.writeGoal.bind(this);
    this.focusIn = this.focusIn.bind(this);
    this.focusOut = this.focusOut.bind(this);
  }

  componentDidMount() {
    this.initContractInstance();

    // setInterval(() => {
    //   this.writeGoalExamples();
    // }, 5000);
    
    
    setTimeout(() => {
      if (!this.state.focused && !this.state.valueSet) {
        this.writeGoal(0, "up");
      }
    }, 4000);
  }

  initContractInstance() {
    let web3 = window.web3;
    let Web3 = window.Web3;
    let provider;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      provider = web3.currentProvider;

      this.web3 = new Web3(provider);

      this.contractInstance = contract(GoFuckingDoItArtifact);
      this.contractInstance.setProvider(provider);
      
      if (typeof this.contractInstance.currentProvider.sendAsync !== "function") {
        this.contractInstance.currentProvider.sendAsync = function() {
          return this.contractInstance.currentProvider.send.apply(
            this.contractInstance.currentProvider, arguments
          );
        };
      }

      this.initMetamaskAcc();
    } else {
      this.setState({metamaskEnabled: false});
    }
  }

  initMetamaskAcc() {
    this.web3.eth.getCoinbase((err, account) => {
      if (err === null) {
        this.account = account;
      }
    });

    setTimeout(() => {
      this.initMetamaskAcc();
    }, 5000);
  }

  calculateDeadline() {
    let setDate = new moment(`${this.state.deadline} ${new moment().format('H:mm:ss')}`);
    let curDate = new moment().utc();

    return {
      valid: setDate.diff(curDate) >= 86300000,
      fromNow: `This is ${setDate.fromNow()}`
    }
  }

  goBack() {
    this.setState({step: this.state.step - 1});
  }

  focusIn() {
    clearTimeout(this.timeout);
    this.setState({focused: true, description: ''});
  }

  focusOut() {
    if (this.state.step === 1 && !this.state.valueSet) {
      this.setState({description: '', focused: false}, () => {
        this.writeGoal(Math.floor(Math.random() * (this.goals.length - 4)) + 1 , 'up');
      });
    } else if (this.state.description === '') {
      this.setState({focused: false, valueSet: false}, () => {
        this.writeGoal(Math.floor(Math.random() * (this.goals.length - 4)) + 1 , 'up');
      });
    }
  }

  writeGoal(goalIdx, state) {
    let goal = this.goals[goalIdx];

    if (goal.length !== this.state.description.length && state === 'up') {
      if (!this.state.description.length) {
        this.setState({description: goal[0]}, () => {
          this.timeout = setTimeout(() => {
            this.writeGoal(goalIdx, 'up');
          }, 100);
        });
      } else {
        this.setState({description: this.state.description + goal.substring(this.state.description.length)[0]}, () => {
          if (goal.length === this.state.description.length) {
            this.timeout = setTimeout(() => { this.writeGoal(goalIdx, 'start-down'); }, 1800);
          } else {
            this.timeout = setTimeout(() => { this.writeGoal(goalIdx, 'up'); }, 100);
          }
        })
      }
    } else if (state === 'start-down') {
      this.timeout = setTimeout(() => {
        this.writeGoal(goalIdx, 'down');
      }, 1000);
    } else if (state === 'down') {  
      this.setState({description: this.state.description.substring(0, this.state.description.length-1)}, () => {
        if (this.state.description === '') {
          let nextGoalIdx = (goalIdx === this.goals.length-1 ? 0 : goalIdx+1);
          this.timeout = setTimeout(() => { this.writeGoal(nextGoalIdx, 'up');}, 1800);
        } else {
          this.timeout = setTimeout(() => { this.writeGoal(goalIdx, 'down'); }, 100);
        }
      });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (name === 'description') {
      this.setState({valueSet: true});
    }

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.step === 1) {
      this.setState({step: 2});
    } else if (this.state.step === 2) {
      this.setState({step: 3});
    } else if (this.state.step === 3) {
      this.setState({step: 4});
    } else if (this.state.step === 4) {
      this.setState({step: 5});
    } else if (this.state.step === 5) {
      this.setState({step: 6});
    } else if (this.state.step === 6) {
      this.contractInstance.deployed().then(app => {
        let deadline = new moment(this.state.deadline + ' ' + new moment().format('H:mm:ss'));
        let deadlineUtc = moment.tz(deadline, 'Etc/GMT').format('YYYY-MM-DD H:mm:ss');

        app.setGoal(this.state.description, this.state.supervisor, this.state.creatorEmail, deadlineUtc, {
          from: this.account,
          value: Eth.toWei(this.state.amount, 'ether'),
          gas: 400000
        }).then((txHash) => {
          console.log('txHash', txHash);

          this.setState({step: 7, txHash: txHash.tx});
        });
      });
    }
  }

  render() {
    let formInner, title;

    if (this.state.step === 1) {
      title = <h1>What's your goal</h1>;

      formInner = (<div>
        <input type="text" name="description" ref={input => this.descriptionInput = input} onFocus={this.focusIn} onBlur={this.focusOut} placeholder="Finish laundry" value={this.state.description} onChange={this.handleChange} required />
        <button onClick={this.goNext}><i className="fa fa-bolt" aria-hidden="true"></i> Go Freaking Do It</button>
      </div>);
    } else if (this.state.step === 2) {
      title = <h1>When</h1>;

      formInner = (<div>
        <input type="date" name="deadline" style={{textAlign: "left"}} value={this.state.deadline} onChange={this.handleChange} min={moment().subtract(14, 'days').format("YYYY-MM-DD")} required />
        <button onClick={this.goNext}><i className="fa fa-calendar-o" aria-hidden="true"></i> Set Deadline</button>
      </div>);
    } else if (this.state.step === 3) {
      title = <h1>You pay on failure</h1>;

      formInner = (<div>
        <input type="number" name="amount" placeholder="0.42" step="0.1" value={this.state.amount} onChange={this.handleChange} required />
        <button onClick={this.goNext}><div id="ether-icon"></div>Set Amount</button>
      </div>);
    } else if (this.state.step === 4) {
      title = <h1>Who confirms you did it</h1>;

      formInner = (<div>
        <input type="email" name="supervisor" placeholder="Supervisor's Email" value={this.state.supervisor} onChange={this.handleChange} required />
        <button onClick={this.goNext}><i className="fa fa-gavel" aria-hidden="true"></i> Set Supervisor</button>
      </div>);
    } else if (this.state.step === 5) {
      title = <h1>Who are you</h1>;

      formInner = (<div>
        <input type="email" name="creatorEmail" placeholder="Your Email" value={this.state.creatorEmail} onChange={this.handleChange} required />
        <button onClick={this.goNext}><i className="fa fa-user" aria-hidden="true"></i> Set Your Email</button>
      </div>);  
    } else if (this.state.step === 6) {
      title = <h1>Do you agree to</h1>;

      formInner = (<div>
        <div id="confirm-commitment">
          <h2>{this.state.description}</h2>
          <h4>by {moment(this.state.deadline).format("dddd DD MMMM, YYYY")}</h4>

          <p>On your deadline, we'll send <b>{this.state.supervisor}</b> an email and ask if you have actually reached your goal.</p>
          <p>If they state you have reached your goal, "Go Freaking Do It" smart contract deployed on Ethereum mainnet will automatically transfer your funds back automatically. If they don't, it will take the balance of {this.state.amount} ETH.</p>
        </div>

        <button onClick={this.goNext}><i className="fa fa-check" aria-hidden="true"></i> Agree To Freaking Do It</button>
      </div>);  
    } else if (this.state.step === 7) {
      title = <h1>Done! Now go freaking do it</h1>

      formInner = (
        <div id="share-goal">
          <div id="share-goal-text">
            <p><b>Your goal was saved. Time to get cracking!</b></p>
            <p>On {moment(this.state.deadline).format("DD MMMM, YYYY")} we'll send <b>{this.state.supervisor}</b> an email and ask if you have actually reached your goal.</p>
            <p>Confirm the transaction on <a href={`https://rinkeby.etherscan.io/tx/${this.state.txHash}`} target="_blank" rel="noopener noreferrer">Etherscan</a>.</p>
          </div>
        </div>
      );
    }

    return (
      <div id="Main">
        {this.state.step > 1 && this.state.step < 7 ? <div id="go-back" onClick={this.goBack}></div> : null}

        {!this.state.metamaskEnabled ?
        <div id="alert-container">
          <div className="alert alert-danger" role="alert">
            <strong>Warning!</strong> This application will not work without Metamask extension enabled. See download links for <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank" rel="noopener noreferrer">Chrome</a> and <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank" rel="noopener noreferrer">Firefox</a>.
          </div>
        </div>
        : null}

        <div id="title-container">
          {title}
        </div>
        <form onSubmit={this.handleSubmit}>
          {formInner}
          <span className="form-message">{this.state.formMessage}</span>
        </form>

        <div id="cursor-down" onClick={() => scrollToElement('#how-it-works')}></div>
      </div>
    );
  }
}

export default Main;
