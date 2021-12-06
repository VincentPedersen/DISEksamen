const classes = require('../Model/classes');

const Client = classes.Client;
const Reservations = classes.Reservations;

function createClient(req,res){
    console.log(req.body.firstName)
    let newClient = new Client(req.body.clientID,req.body.firstName,req.body.lastName,req.body.streetAddress,req.body.city)
   
    
    
    

    res.end('BYE')
}

function createReservation(req,res){
    
}

module.exports = createClient