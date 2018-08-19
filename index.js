const express = require("express");
const app = express();
const simplechain = require("./simpleChain");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 8000;

const ERROR = "ERROR";

app.get("/",(req,res)=>{
    console.log()
    res.send({"data" : "welcome route"})
})

app.get("/block/:blockheight", (req,res)=>{
    var blockheight = req.params.blockheight;
    console.log("blockheight ",blockheight)
    const blockchain = new simplechain.Blockchain();
    if(blockheight ==null){
        res.send({
            "status" : ERROR,
            "message" : "please send blockheight parameter in http get request"
        })
    }
    else{
        blockchain.getBlock(blockheight).then( data => {
            if(data == null){
                throw "block not found for given blockheight"
            }
            else{
                console.log("then getBlock ",data)
                res.send(data)
            }
        })
        .catch((err)=>{
            console.log("err ",  err.Error)
            res.send({
                "status" : ERROR,
                "message" : err,
                "blockheight" : blockheight
            })
        })
    }
})

app.post("/block",(req,res)=>{
    console.log("/block post invoked");
    var body = req.body.body;
    console.log("body ",body);
    if(body == null){
        res.send({
            "status" : ERROR,
            "message" : "body is empty. Please send post request with body parameter"
        })
    }
    else{
        const block = new simplechain.Block()
        const blockchain = new simplechain.Blockchain();
        block.body = body;
        blockchain.addBlock(block).then((data) =>{
            console.log("data ",data)
            res.send(data);
        }).catch((err) =>{
            console.log("err ",err)
            res.send({
                "status" : ERROR,
                "message" : err,
                "body" : body
            })
        });
    }
});

app.use((req,res) => {
    res.send({
        "status" : ERROR,
        "message" : "invalid url",
        "sampleEndpoints " : {
            "endpoint 1" : {
                "method" : "GET",
                "uri" : "/block/:blockheight"
            },
            "endpoint 2" : {
                "method" : "POST",
                "uri" : "/block",
                "content-type" : "application/json",
                "Request body" : {
                    "body":"your block message"
                }
            }
        }
    })
});

app.listen(PORT,()=>{
    console.log("server started at port ",PORT);
})