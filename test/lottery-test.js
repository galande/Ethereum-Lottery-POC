const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const {interface, bytecode} = require('../compile');

const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts;
let lottery;

beforeEach(async () => {

    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({from:accounts[0], gas: 1000000});
});

describe('Lottery Contract', ()=>{

    it('Deploy the contract', () =>{
        assert.ok(lottery.options.address)
    });

    it('Should add 1 player', async () =>{

        await lottery.methods.enter().send({
            from: accounts[0], 
            value: web3.utils.toWei('0.02', 'ether')});

        const players = await lottery.methods.getPlayers().call({from: accounts[0]});

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);

    });
});