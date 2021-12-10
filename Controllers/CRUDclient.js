const classes = require('../Model/classes');
const azureCaller = require('../AzureFunctionsCaller');
const Client = classes.Client;


function createClient(req,res){
    console.log(' Creating a new client...')
    let newClient = new Client('',req.body.firstName,req.body.lastName,req.body.streetAddress,req.body.city)

    azureCaller.createClient(newClient);
    res.send(`Finished creating a new client`)
    res.end('')
}

function deleteClient(req,res){
    let clientID = req.query.clientID || req.body.clientID;
    console.log(`Deleting client number ${clientID}...`)
    let deleteClient = new Client(clientID,'','','','');

    azureCaller.deleteClient(deleteClient);
    res.end(`Deleted client number ${clientID}`)
}

async function getClient(req,res){
    let clientID = req.query.clientID || req.body.clientID
    console.log(`Getting client number ${clientID}...`)
    
    let getClient = new Client(clientID,'','','','');

    let result = await azureCaller.getClient(getClient);

    let resultClient = new Client(result[0],result[1],result[2],result[3],result[4]);

    console.log(resultClient)
    res.send(resultClient)
    console.log(`Got the client with number ${clientID}`)
    res.end('')
    return result
    
}

function updateClient(req,res){
    console.log(`Updating client number ${req.body.clientID}...`)
    let updateClient = new Client(req.body.clientID,req.body.firstName,req.body.lastName,req.body.streetAddress,req.body.city);
    console.log(updateClient)
    azureCaller.updateClient(updateClient);
    res.send(`Finished updating client number ${req.body.clientID} `)
    res.end('')
}

async function getAllClients(req,res){
    console.log('Getting all the clients...')
    let result = await azureCaller.getAllClients();
    console.log(result)
    res.send(result)
    console.log('Finished getting all the clients')
    res.end('')
}

async function allReservationsClient(req,res){
    let clientID = req.query.clientID ||req.body.clientID;
    console.log(clientID)
    let result = await azureCaller.allReservationsClient(clientID);
    res.send(result);
    res.end('')
}


module.exports = {
    createClient,
    deleteClient,
    getClient,
    updateClient,
    getAllClients,
    allReservationsClient
}