import json

from web3 import Web3, HTTPProvider, TestRPCProvider
from web3.contract import ConciseContract

go_fucking_do_it_json = open('GoFuckingDoIt.json').read()
go_fucking_do_it_artifact = json.loads(go_fucking_do_it_json)

# web3.py instance
#w3 = Web3(TestRPCProvider())
#w3 = Web3(HTTPProvider('https://mainnet.infura.io'))
w3 = Web3(HTTPProvider('http://localhost:8545'))

# Contract instance in concise mode
contract_instance = w3.eth.contract(
    go_fucking_do_it_artifact['abi'], '0xfb0a4e5bbc481ae30826742c325ac26442cf0253')  # go_fucking_do_it_artifact['networks']['1510566504532']['address']

# print(go_fucking_do_it_artifact['networks']['1510566504532']['address'])
# print(go_fucking_do_it_artifact['abi'])
print(dir(contract_instance))
print(w3.eth.accounts)

# Getters + Setters for web3.eth.contract object
print(contract_instance.call().getGoal2())
#contract_instance.setGreeting('Nihao', transact={'from': w3.eth.accounts[0]})
#print('Setting value to: Nihao')
#print('Contract value: {}'.format(contract_instance.greet()))

# # GoFuckingDoItArtifact.networks['1510566504532'].address
