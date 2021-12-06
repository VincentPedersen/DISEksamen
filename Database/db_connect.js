let Connection = require('tedious').Connection;
let Request = require('tedious').Request;

const config = require('./config.json');

let connection = new Connection(config)

connection.on('connect',function(err){
    if(err){
        console.log(err)
    } else {
        console.log("Connected")
    }
});

connection.connect()