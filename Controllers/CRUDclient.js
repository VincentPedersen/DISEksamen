const classes = require('../Model/classes');
const azureCaller = require('../AzureFunctionsCaller');
const Client = classes.Client;


function createClient(req,res){
    res.send('\n Creating a new client... \n')
    let newClient = new Client('',req.body.firstName,req.body.lastName,req.body.streetAddress,req.body.city)

    azureCaller.createClient(newClient);
    res.end('\n Finished creating a new client \n')
}

function deleteClient(req,res){
    res.send(`\n Deleting client number ${req.body.clientID}... \n`)
    let deleteClient = new Client(req.body.clientID,'','','','');

    azureCaller.deleteClient(deleteClient);
    res.end(`\n Deleted client number ${req.body.clientID} \n`)
}

async function getClient(req,res){
    res.send(` \n Getting client number ${req.body.clientID}... \n`)
    let getClient = new Client(req.body.clientID,'','','','');

    let result = await azureCaller.getClient(getClient);

    let resultClient = new Client(result[0],result[1],result[2],result[3],result[4]);

    console.log(resultClient)
    res.end(`\n Got the client with number ${req.body.clientID} \n`)
    return result
}

function updateClient(req,res){
    res.send(`\n Updating client number ${req.body.clientID} \n`)
    let updateClient = new Client(req.body.clientID,req.body.firstName,req.body.lastName,req.body.streetAddress,req.body.city);
    console.log(updateClient)
    azureCaller.updateClient(updateClient);
    res.end(`\n Finished updating client number ${req.body.clientID} \n`)
}

async function getAllClients(req,res){
    res.send('\n Getting all the clients... \n')
    let result = await azureCaller.getAllClients();
    console.log(result)
    res.end('\n Finished getting all the clients \n')
}


module.exports = {
    createClient,
    deleteClient,
    getClient,
    updateClient,
    getAllClients
}