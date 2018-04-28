const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    'render drink announce ritual tower random jazz cycle disease gun eye crumble',
    'https://rinkeby.infura.io/k6koqnBm6esL2uSbRJNA'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
  
    console.log('Attempting to deploy from account', accounts[0]);
  
   const result = await new web3.eth.Contract(JSON.parse(interface))
                    .deploy({data:bytecode})
                    .send({gas: '1000000', from: accounts[0]});
    console.log(result);
    console.log('Contract Deployed to ', result.options.address);
  };
  deploy();