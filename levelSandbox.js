/* ===== Persist data with LevelDB ==================
|  Learn more: level: https://github.com/Level/level |
/===================================================*/

let level = require('level');
let chainDB = './chaindata';
let db = level(chainDB);

// Add data to levelDB with key/value pair
const addLevelDBData =  (key,value) =>{
  db.put(key, value, function(err) {
    if (err) return console.log('Block ' + key + ' submission failed', err);
  })
};

// Get data from levelDB with key
 const getLevelDBData = (key)=>{
    return new Promise(function(resolve,reject){
        db.get(key, function(err, value) {
            if (err) {
                console.log('Not found!', err);
                reject(err);
            }
            //console.log(key, " == " ,value);
            var myvalue = JSON.parse(value);
            //console.log("myvalue ",myvalue.hash);
            resolve(myvalue);
        }) 
    });
};

//https://github.com/Level/level#put

// Add data to levelDB with value
 const addDataToLevelDB = (value) =>{
    let i = 0;
    db.createReadStream().on('data', function(data) {
          i++;
        }).on('error', function(err) {
            return console.log('Unable to read data stream!', err)
        }).on('close', function() {
         // console.log('Block #' + i);
          //console.log("value ",value)
          addLevelDBData(i, value);
        });
};

const getBlockChainLength = ()=>{
    return new Promise(function(resolve,reject){
        var length = 0;
        db.createReadStream({ keys: true, values: true }).on('data', function(data) {
           // console.log("data ",data);
            length++;
        }).on('error', function(err) {
            //console.log('Unable to read data stream!', err)
            reject(err)
        }).on('close', function() {
            console.log("getBlockChainLength ",length);
            resolve(length);
        });
    });
};
var printAllBlocks = async ()=>{
    return new Promise(function(resolve,reject){
        console.log("in printAllBlocks()")
        db.createReadStream({ keys: true, values: true }).on('data', function(data) {
            console.log("data ",data);
        }).on('error', function(err) {
            //console.log('Unable to read data stream!', err)
            reject(err)
        }).on('close', function() {
            resolve("")
        });
    });
}
//printAllBlocks().then(()=>console.log(""))

//input blockheight
var getBlockUsingHeight = (blockheight)=>{
    return new Promise(function(resolve,reject){
        console.log("in getBlock(blockheight)")
        var exactBlock = null;
        db.createReadStream({ keys: true, values: true }).on('data', function(data) {
           // console.log("data ",data);
            var myvalue = JSON.parse(data.value);
            if(blockheight == myvalue.height){
                exactBlock = myvalue;
                return;
            }
        }).on('error', function(err) {
            //console.log('Unable to read data stream!', err)
            reject(err)
        }).on('close', function() {
            //console.log("exactBlock ",exactBlock)
            resolve(exactBlock)
        });
    });
};

module.exports = {addLevelDBData,getLevelDBData,addDataToLevelDB,getBlockChainLength,getBlockUsingHeight,printAllBlocks};