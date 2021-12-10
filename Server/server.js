const express = require('express');
const fs = require('fs');
const server = express();
const axios = require('axios');
const https = require('https');
const path = require('path');
//Using port 0, because the OS will then automatically assign a free port
const port = 0;
server.use(express.urlencoded({extended: true}));
server.use(express.json('application/json'));
//Makes sure it works with self signed certificate
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const options = {
    key: fs.readFileSync('../Cert/server.key'),
    cert: fs.readFileSync('../Cert/server.cert')

}



function register(port){ //When the server turns on it sends a registration to the load balancer, letting it know a server is available and what it's port is
return axios({
    method: 'get',
    url: 'https://localhost:4200/register',
    data: {
        newPort: port
    }
    
}).then(function (response) {
    //console.log(response);
  }).catch(function (error) {
    console.log(error);
  });
};

server.on('error', (err) => { //Logs if an error occurs
    console.log(`server error:\n${err.stack}`);
  });


let httpsServer;
function createServer(port){
    try {   
    httpsServer = https.createServer(options,server).listen(port);
    httpsServer.on('listening', () => {
        console.log(`Server is listening on port: ${httpsServer.address().port}`)
        port = httpsServer.address().port
        register(port);
    })
    
    } catch(error){
        console.log('Something went wrong when creating the server, please try again')
    }
}
    
server.use(function(req, res, next) {
    req.socket.on("error", function() {

    });
    res.socket.on("error", function() {

    });
    next();
});

//Imports the controllers
const createClient = require('../Controllers/CRUDclient').createClient;
const deleteClient = require('../Controllers/CRUDclient').deleteClient;
const getClient = require('../Controllers/CRUDclient').getClient;
const updateClient = require('../Controllers/CRUDclient').updateClient;
const getAllClients = require('../Controllers/CRUDclient').getAllClients;

const createReservation = require('../Controllers/CRUDReservation').createReservation;
const deleteReservation = require('../Controllers/CRUDReservation').deleteReservation;
const getReservation = require('../Controllers/CRUDReservation').getReservation;
const updateReservation = require('../Controllers/CRUDReservation').updateReservation;
const getAllReservations = require('../Controllers/CRUDReservation').getAllReservations;


const allReservationsClient = require('../Controllers/CRUDclient').allReservationsClient;

server.get('/', (req, res) => { //If the server gets a request from somewhere it'll respond with a message including its port
    console.log('Request recieved');
    res.sendFile(path.join(__dirname,'../View/homepage.html'))
    //res.send(`Response sent from port: ${httpsServer.address().port}`);
})

server.get('/client.js', (req, res) => {
    res.sendFile(path.join(__dirname,'../View/client.js'))
})



//Endpoints for client
server.post('/createClient',createClient);
server.delete('/createClient',deleteClient);
server.get('/createClient',getClient);
server.put('/createClient',updateClient);

//Endpoints for reservation

server.post('/reservation',createReservation);
server.delete('/reservation',deleteReservation);
server.get('/reservation',getReservation);
server.put('/reservation',updateReservation);


server.get('/allClients',getAllClients);
server.get('/allReservations',getAllReservations);
server.post('/allClients',allReservationsClient);

createServer();




