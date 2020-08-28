const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;
const INITIAL_MESSAGE = 'Hey you!';
// https://ropsten.infura.io/v3/de72ca31dd2544fd8c1b4fb64dfefc8f
beforeEach(async () => {

    //get a list of all accounts
    accounts = await web3.eth.getAccounts();

    //use one to deploy contract
    //tell web3 what methods contract has #ABI
    //ABI is json, to pass as object use JSON.parse
    //creates contract object
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        //makes a deployable contract, arguments = contract construtor fxn args
        .deploy({data: bytecode, arguments: [INITIAL_MESSAGE]})
        //sends txn to deploy contract #realdeal
        .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {

    //test contract is deployed
    it('deploys a contract', function () {
        //checks value exists and defined
        assert.ok(inbox.options.address);
    });

    it('has a default message', async function () {

        //message is public, can be invoked as fxn
        //msg() -> for fxn args
        //call() -> for sending a transaction
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MESSAGE);

    });

    it('can change message', async function () {
        //send transaction to chnage data, returns hash ore returns error
        await inbox.methods.setMessage('Bye Bye').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message,'Bye Bye')
    });

});


