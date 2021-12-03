const express = require('express');
const httpProxy = require('http-proxy');

const server = express();
server.use(express.json());

let proxy = httpProxy.createProxyServer({});

let portArr = [];

server.get('/register', (req, res) => { //Handles a request from a server by saving its designated port within an array
    console.log(req.body.newPort);
    portArr.push(req.body.newPort)
})
server.on('error', (err) => { //Logs if an error occurs
    console.log(`server error:\n${err.stack}`);
  });

let i = 0;
server.get('/', (req, res) => { //Handles request from a client by forwarding its request to a server
    if(i == portArr.length) {
        i=0
    }
    if(portArr.length == 0){
        res.send('No servers are currently available')
        res.end
    } else {
        proxy.web(req, res, {target: 'http://localhost:' + portArr[i]});
        i++
    }
})

server.listen(4200, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Server listening on port: ' + 4200);
    };
});