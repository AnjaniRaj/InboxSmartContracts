// for consistency across os
const path = require('path');
const fs =require('fs');
const solc = require('solc');

const inboxPath= path.resolve(__dirname,'contracts','Inbox.sol');
const source = fs.readFileSync(inboxPath,'utf8');

//log solc.compile to get a view of the output
console.log(solc.compile(source,1).contracts[':Inbox'])

module.exports = solc.compile(source,1).contracts[':Inbox'];

