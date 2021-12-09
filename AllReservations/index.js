let Connection = require("tedious").Connection;
let Request = require("tedious").Request;
let TYPES = require("tedious").TYPES;
let Reservation = require('../Model/classes').Reservations
//const config = require('../Database/config.json');
const config = {
  server: "vincentsdatingserver.database.windows.net",
  authentication: {
    type: "default",
    options: {
      userName: "Vincent",
      password: "Vin2021vin",
    },
  },
  options: {
    encrypt: true,
    database: "Travel Reservations",
  },
};

const executeSQL = (context,method,clientID) => {
  let result = [];
  var request;
  
  //Create connection object
  const connection = new Connection(config);

  //Create the SQL command to be executed
  
     switch(method){
         case "GET":
            request = new Request(`SELECT * FROM [Travel Reservations].[Travel Reservations].Reservations`,
            function (err) {
              if (err) {
                context.log.error(err);
                context.res.status = 500;
                context.res.body = "Error executing T-SQL command";
              } else {
                context.res = {
                  body: result,
                };
              }
              context.done();
            }
          );
          break;

          case "POST":
            request = new Request(`SELECT * FROM [Travel Reservations].[Travel Reservations].Reservations WHERE clientID = '${clientID}'`,
            function (err) {
              if (err) {
                context.log.error(err);
                context.res.status = 500;
                context.res.body = "Error executing T-SQL command";
              } else {
                context.res = {
                  body: result,
                };
              }
              context.done();
            }
          );
          break;
     }
      
      

    


  //Execute request
  connection.on("connect", (err) => {
    if (err) {
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
  request.on("row", (columns) => {
    let reservation = new Reservation(columns[0].value,columns[1].value,columns[2].value,columns[3].value,columns[4].value,columns[5].value,columns[6].value)
    result.push(reservation)
  });

  //Connect
  connection.connect();
};

function allReservations(context, req) {
  try {
    context.log(
      "Javascript HTTPS trigger function all Clients processed a request"
    );
    const method = req.method;
    const clientID = req.query.clientID || (req.body && req.body.clientID);
    executeSQL(context,method,clientID);
  } catch (err) {
    console.log(err);
  }
} 

module.exports = allReservations;