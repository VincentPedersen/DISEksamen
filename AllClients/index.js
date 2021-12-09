let Connection = require("tedious").Connection;
let Request = require("tedious").Request;
let TYPES = require("tedious").TYPES;
let Client = require('../Model/classes').Client
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

const executeSQL = (context) => {
  let result = [];
  
  //Create connection object
  const connection = new Connection(config);

  //Create the SQL command to be executed
  
     
      let request = new Request(`SELECT * FROM [Travel Reservations].[Travel Reservations].Clients`,
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
    
    let client = new Client(columns[0].value,columns[1].value,columns[2].value,columns[3].value,columns[4].value)
    result.push(client)
  });

  //Connect
  connection.connect();
};

function allClients(context, req) {
  try {
    context.log(
      "Javascript HTTPS trigger function all Clients processed a request"
    );
    executeSQL(context);
  } catch (err) {
    console.log(err);
  }
} 

module.exports = allClients;
