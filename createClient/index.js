let Connection = require("tedious").Connection;
let Request = require("tedious").Request;
let TYPES = require("tedious").TYPES;
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

const executeSQL = (context,method,clientID,firstName,lastName,streetAddress,city) => {
  let result = "";
  var request;
  //Create connection object
  const connection = new Connection(config);

  //Create the SQL command to be executed
  switch (method) {
    case "GET":
      request = new Request(`SELECT ClientID,firstName,lastName,streetAddress,city FROM [Travel Reservations].[Travel Reservations].Clients WHERE ClientID = '${clientID}'`,
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
      request = new Request(`INSERT INTO [Travel Reservations].[Travel Reservations].Clients
                                (firstName,lastName,streetAddress,city) VALUES ('${firstName}','${lastName}','${streetAddress}','${city}')`,
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

    case "DELETE":
      request = new Request(`DELETE FROM [Travel Reservations].[Travel Reservations].Clients WHERE ClientID = '${clientID}'`,
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
  
    case "PUT":
        request = new Request(`UPDATE [Travel Reservations].[Travel Reservations].Clients SET firstName = '${firstName}',lastName = '${lastName}',streetAddress = '${streetAddress}',city = '${city}' WHERE ClientID = '${clientID}'`,
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
    columns.forEach((column) => {
      result += column.value;
    });
  });

  //Connect
  connection.connect();
};

function createClient(context, req) {
  try {
    context.log(
      "Javascript HTTPS trigger function create Client processed a request"
    );
    context.log(req.method);
    const method = req.method;
    const clientID = req.query.clientID || (req.body && req.body.clientID);
    const firstName = req.query.firstName || (req.body && req.body.firstName);
    const lastName = req.query.lastName || (req.body && req.body.lastName);
    const streetAddress = req.query.streetAddress || (req.body && req.body.streetAddress);
    const city = req.query.city || (req.body && req.body.city);
    executeSQL(context,method,clientID,firstName,lastName,streetAddress,city);
  } catch (err) {
    console.log(err);
  }
} 

module.exports = createClient;
