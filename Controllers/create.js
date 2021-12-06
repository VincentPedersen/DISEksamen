const classes = require('../Model/classes');
const azureCaller = require('../AzureFunctionsCaller');
const Client = classes.Client;
const Reservations = classes.Reservations;

function createClient(req,res){
    console.log(req.body.firstName)
    let newClient = new Client('',req.body.firstName,req.body.lastName,req.body.streetAddress,req.body.city)
   
    azureCaller.createClient(newClient);
    
    res.end('Response')
}

function createReservation(req,res){
    
}

module.exports = createClient