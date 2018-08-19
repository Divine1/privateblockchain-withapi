# privateblockchain-withapi

## Nodejs framework

[Expressjs](https://expressjs.com/) framework is used in this project
` npm install --save express `

Entry point for the application is `index.js`

## Other libraries used
` npm install --save level `

` npm install --save crypto-js `

` npm install --save body-parser `


`body-parser` library is use to parse body parameter of HTTP POST request

## End point details

URL configured in this Project : `http://localhost:9000` 

    - Endpoint 1
        - method : GET
        - uri : /block/:blockheight
    
    - Endpoint 2 
        - method : POST
        - uri : /block
        - content-type : application/json
        - Request body : ` { body : your block message } `

You can also enter an invalid endpoint say for example `http://localhost:9000/xyz` to view the end point details


## Below are the description for private blockchain project without API


#### Create first block. This first block in block chain is called as the genesis block.Genesis block is persisted via constructor

`var bl = new Blockchain();`

#### Add new block to the blockchain network

    `bl.addBlock(new Block("my second block"))`


#### Validate block stored within leveldb

    `bl.validateChain()`

#### To validate entire blockchain, i have used async/await for db interactions, so we need to use promises to access the return value

    `bl.validateBlock(3).then(data => console.log("validateBlock ",data))`

#### To get block for given height as input, i have used async/await for db interactions, so we need to use promises to access the return value

    `bl.getBlock(3).then( data => console.log("then getBlock ",data))`

#### To get total blockheight in blockchain, i have used async/await for db interactions, so we need to use promises to access the return value

    `bl.getBlockHeight().then( data => console.log("then getBlockHeight ",data))`



