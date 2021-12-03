const express = require('express');
const fs = require('fs');
const server = express();
const axios = require('axios');
const https = require('https');
const port = Math.floor((Math.random()*9999)+1);


const options = {
    key: fs.readFileSync('../Cert/server.key'),
    cert: fs.readFileSync('../Cert/server.cert')

}


function register(){ //When the server turns on it sends a registration to the load balancer, letting it know a server is available and what it's port is
return axios({
    method: 'get',
    url: 'http://localhost:4200/register',
    data: {
        newPort: port
    }
    
}).then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log(error);
  });
};

server.on('error', (err) => { //Logs if an error occurs
    console.log(`server error:\n${err.stack}`);
  });
server.get('/', (req, res) => { //If the server gets a request from somewhere it'll respond with a message including its port
    console.log('Request recieved');
    
    res.send(`Response sent from port: ${port}`);
})
function createServer(){
    let httpsServer = https.createServer(options,server).listen(port);
    httpsServer.on('listening', () => {
        console.log(`Server is listening on port: ${port}`)
    })

}

/*
server.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
    register(); //Calling the register function
});*/


    
server.use(function(req, res, next) {
    req.socket.on("error", function() {

    });
    res.socket.on("error", function() {

    });
    next();
});
createServer();
register();



