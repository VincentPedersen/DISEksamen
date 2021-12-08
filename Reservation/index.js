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

const executeSQL = (context,method,reservationID,clientID,dateStart,dateEnd,hotelName,price,balance) => {
  let result = "";
  var request;
  //Create connection object
  const connection = new Connection(config);

  //Create the SQL command to be executed
  switch (method) {
    case "GET":
      request = new Request(`SELECT ReservationID,clientID,dateStart,dateEnd,hotelName,price,balance FROM [Travel Reservations].[Travel Reservations].Reservations WHERE ReservationID = '${reservationID}'`,
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
      request = new Request(`INSERT INTO [Travel Reservations].[Travel Reservations].Reservations
                                (clientID,dateStart,dateEnd,hotelName,price,balance) VALUES ('${clientID}','${dateStart}','${dateEnd}','${hotelName}','${price}','${balance}')`,
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
      request = new Request(`DELETE FROM [Travel Reservations].[Travel Reservations].Reservations WHERE ReservationID = '${reservationID}'`,
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
        request = new Request(`UPDATE [Travel Reservations].[Travel Reservations].Reservations SET clientID = '${clientID}',dateStart = '${dateStart}',dateEnd = '${dateEnd}',hotelName = '${hotelName}',price = '${price}',balance = '${balance}' WHERE ReservationID = '${reservationID}'`,
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

function reservation(context, req) {
  try {
    context.log(
      "Javascript HTTPS trigger function reservation processed a request"
    );
    context.log(req.method);
    context.log(req.body.clientID)
    const method = req.method;
    const reservationID = req.query.reservationID || (req.body && req.body.reservationID);
    const clientID = req.query.clientID || (req.body && req.body.clientID);
    const dateStart = req.query.dateStart || (req.body && req.body.dateStart);
    const dateEnd = req.query.dateEnd || (req.body && req.body.dateEnd);
    const hotelName = req.query.hotelName || (req.body && req.body.hotelName);
    const price = req.query.price || (req.body && req.body.price);
    const balance = req.query.balance || (req.body && req.body.balance);

    

    executeSQL(context,method,reservationID,clientID,dateStart,dateEnd,hotelName,price,balance);
  } catch (err) {
    console.log(err);
  }
} 

module.exports = reservation;
