const classes = require('../Model/classes');
const azureCaller = require('../AzureFunctionsCaller');
const Client = classes.Client;


function createClient(req,res){
    let newClient = new Client('',req.body.firstName,req.body.lastName,req.body.streetAddress,req.body.city)

    azureCaller.createClient(newClient);
    res.end('Response')
}

function deleteClient(req,res){
    let deleteClient = new Client(req.body.clientID,'','','','');

    azureCaller.deleteClient(deleteClient);
    res.end('Response deleted')
}

function getClient(req,res){
    let getClient = new Client(req.body.clientID,'','','','');

    azureCaller.getClient(getClient);
    res.end('Getting the client!')
}

function updateClient(req,res){
    let updateClient = new Client(req.body.clientID,req.body.firstName,req.body.lastName,req.body.streetAddress,req.body.city);

    azureCaller.updateClient(updateClient);
    res.end('Updating the client!')
}


module.exports = {
    createClient,
    deleteClient,
    getClient,
    updateClient
}