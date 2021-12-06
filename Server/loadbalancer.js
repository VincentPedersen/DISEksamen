const express = require('express');
const https = require('https');
const httpProxy = require('http-proxy');
const fs = require('fs');
let port = 4200;

//makes sure it works with self signed certificate
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
/*
let seaportServer = seaport.createServer()
seaportServer.listen(5001);
*/
const server = express();
/*
server.use(express.urlencoded({extended: true}));
server.use(express.json('application/json'));
*/
const options = {
    key: fs.readFileSync('../Cert/server.key'),
    cert: fs.readFileSync('../Cert/server.cert')

}

let httpsServer = https.createServer(options,server).listen(port);
    httpsServer.on('listening', () => {
        console.log(`Server is listening on port: ${port}`)
    })

let options2 = {
    changeOrigin: true, 
    target: {
        https: true
    },
    secure: false,
    tsl: true
}
let portArr = [];
let proxy = httpProxy.createProxyServer(options2)

//fixing stream issue with using POST and PUT with proxy 
proxy.on('proxyReq', (proxyReq, req) => {
    if (req.body && req.complete) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  });


server.get('/register',express.json(), (req, res) => { //Handles a request from a server by saving its designated port within an array
    console.log(req.body.newPort);
    portArr.push(req.body.newPort)
    res.end('Received') //Sends response back to server to avoid socket hang up 
})
server.on('error', (err) => { //Logs if an error occurs
    console.log(`server error:\n${err.stack}`);
  });

let i = 0;

server.all(/^((?!register).)*$/,express.json(), (req, res) => { //Handles request from a client by forwarding its request to a server
    if(i == portArr.length) {
        i=0
    }
    if(portArr.length == 0){
        res.send('No servers are currently available')
        res.end
    } else {
        console.log(req.body)
        proxy.web(req, res, {target: 'https://localhost:' + portArr[i]});
        i++
    }
});
