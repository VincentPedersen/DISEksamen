const classes = require('../Model/classes');
const azureCaller = require('../AzureFunctionsCaller');
const Client = classes.Client;


function createClient(req,res){
    //res.send('\n Creating a new client... \n')
    let newClient = new Client('',req.body.firstName,req.body.lastName,req.body.streetAddress,req.body.city)

    azureCaller.createClient(newClient);
    res.send(`Finished creating a new client`)
}

function deleteClient(req,res){
    let clientID = req.query.clientID || req.body.clientID;
    //res.send(`\n Deleting client number ${clientID}... \n`)
    let deleteClient = new Client(clientID,'','','','');

    azureCaller.deleteClient(deleteClient);
    res.end(`Deleted client number ${clientID}`)
}

async function getClient(req,res){
    let clientID = req.query.clientID || req.body.clientID
    //res.send(` \n Getting client number ${clientID}... \n`)
    
    let getClient = new Client(clientID,'','','','');

    let result = await azureCaller.getClient(getClient);

    let resultClient = new Client(result[0],result[1],result[2],result[3],result[4]);

    console.log(resultClient)
    res.send(resultClient)
    //res.end(`\n Got the client with number ${req.body.clientID} \n`)
    return result
}

function updateClient(req,res){
    //res.send(`\n Updating client number ${req.body.clientID} \n`)
    let updateClient = new Client(req.body.clientID,req.body.firstName,req.body.lastName,req.body.streetAddress,req.body.city);
    console.log(updateClient)
    azureCaller.updateClient(updateClient);
    res.send(`Finished updating client number ${req.body.clientID} `)
}

async function getAllClients(req,res){
    //res.send('\n Getting all the clients... \n')
    let result = await azureCaller.getAllClients();
    console.log(result)
    res.send(result)
    //res.end('\n Finished getting all the clients \n')
}

async function allReservationsClient(req,res){
    let clientID = req.query.clientID ||req.body.clientID;
    console.log(clientID)
    let result = await azureCaller.allReservationsClient(clientID);
    res.send(result);
}


module.exports = {
    createClient,
    deleteClient,
    getClient,
    updateClient,
    getAllClients,
    allReservationsClient
}