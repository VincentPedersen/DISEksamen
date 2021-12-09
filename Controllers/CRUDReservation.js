const classes = require('../Model/classes');
const azureCaller = require('../AzureFunctionsCaller');
const Reservation = classes.Reservations;


function createReservation(req,res){
    res.send('\n Creating a new reservation...\n')
    let newReservation = new Reservation('',req.body.clientID,req.body.dateStart,req.body.dateEnd,req.body.hotelName,req.body.price,req.body.balance);
    console.log(newReservation)
    azureCaller.createReservation(newReservation);
    res.end('\n Created a new reservation \n')
}

function deleteReservation(req,res){
    res.send(`\n Deleting reservation number ${req.body.reservationID}...\n`)
    let deleteReservation = new Reservation(req.body.reservationID,'','','','','','');

    azureCaller.deleteReservation(deleteReservation);
    res.end(`\n Deleted reservation number ${req.body.reservationID} \n`)
}

async function getReservation(req,res){
    res.send(`\n Getting reservation number ${req.body.reservationID}... \n`)
    let getReservation = new Reservation(req.body.reservationID,'','','','','','');

    let result = await azureCaller.getReservation(getReservation);

    let resultReservation = new Reservation(result[0],result[1],result[2],result[3],result[4],result[5],result[6])
    console.log(resultReservation)
    res.end(`\n Finished getting reservation number ${req.body.reservationID}...\n`)
}

function updateReservation(req,res){
    res.send(`\n Updating reservation number ${req.body.reservationID}... \n`)
    let updateReservation = new Reservation(req.body.reservationID,req.body.clientID,req.body.dateStart,req.body.dateEnd,req.body.hotelName,req.body.price,req.body.balance);
    console.log(updateReservation)
    azureCaller.updateReservation(updateReservation);
    res.end(`\n Finished updating reservation number ${req.body.reservationID}... \n`)
}

async function getAllReservations(req,res){
    res.send('\n Getting all the reservations... \n')
    let result = await azureCaller.getAllReservations();
    console.log(result)
    res.end('\n Finished getting all the reservations \n')
}



module.exports = {
    createReservation,
    deleteReservation,
    getReservation,
    updateReservation,
    getAllReservations
}