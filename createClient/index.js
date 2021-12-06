let Connection = require('tedious').Connection;
let Request = require('tedious').Request;
let TYPES = require('tedious').TYPES;
const config = require('../Database/config.json');


const executeSQL = (context,firstName,lastName,streetAddress,city) => {
    let result = "";
    //Create connection object
    const connection = new Connection(config)


    //Create the SQL command to be executed

    const request = new Request(`INSERT INTO [Travel Reservations].[Travel Reservations].Clients
                                (firstName,lastName,streetAddress,city) VALUES ('${firstName}','${lastName}','${streetAddress}','${city}')`,function(err){
        if (err){
            context.log.error(err);
            context.res.status = 500;
            context.res.body = "Error executing T-SQL command";
        } else {
            context.res = {
                body: result
            }
        }
        context.done();
    });



    //Execute request
    connection.on('connect',err=>{
        if (err){
            context.log.error(err);
            context.res.status = 500; 
            context.res.body = "Error connecting to Azure SQL query";
            context.done();
        } else {
            //the connection has succceeded so we can execute the T-SQL 
            connection.execSql(request);
        }
    });

    //Handle the result and send back from Azure SQL 
    request.on('row',columns => {
        columns.forEach(column => {
            result += column.value;
        });
    });


    //Connect
    connection.connect();
}

function createClient (context,req){
    try {
        context.log('Javascript HTTPS trigger function create Client processed a request');
        const firstName = (req.query.firstName||(req.body && req.body.firstName));
        const lastName = (req.query.lastName||(req.body && req.body.lastName));
        const streetAddress = (req.query.streetAddress||(req.body && req.body.streetAddress));
        const city = (req.query.city||(req.body && req.body.city));
        executeSQL(context,firstName,lastName,streetAddress,city)
    }
    catch(err){
        console.log(err)
    }
}

module.exports = createClient;