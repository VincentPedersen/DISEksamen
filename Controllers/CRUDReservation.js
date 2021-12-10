const classes = require('../Model/classes');
const azureCaller = require('../AzureFunctionsCaller');
const Reservation = classes.Reservations;


function createReservation(req,res){
    console.log('Creating a new reservation...')
    let newReservation = new Reservation('',req.body.clientID,req.body.dateStart,req.body.dateEnd,req.body.hotelName,req.body.price,req.body.balance);
    console.log(newReservation)
    azureCaller.createReservation(newReservation);
    res.send(` Created a new reservation`)
}

function deleteReservation(req,res){
    let reservationID = req.query.reservationID || req.body.reservationID;
    console.log(`Deleting reservation number ${reservationID}...`)
    let deleteReservation = new Reservation(reservationID,'','','','','','');

    azureCaller.deleteReservation(deleteReservation);
    res.end(`Deleted reservation number ${reservationID} `)
}

async function getReservation(req,res){
    console.log(`Getting reservation number ${reservationID}...`)
    let reservationID = req.query.reservationID ||req.body.reservationID
    let getReservation = new Reservation(reservationID,'','','','','','');

    let result = await azureCaller.getReservation(getReservation);

    let resultReservation = new Reservation(result[0],result[1],result[2],result[3],result[4],result[5],result[6])
    console.log(resultReservation)

    res.send(resultReservation)
    console.log(`Finished getting reservation number ${req.body.reservationID}...`)
}

function updateReservation(req,res){
    console.log(`Updating reservation number ${req.body.reservationID}...`)
    let updateReservation = new Reservation(req.body.reservationID,req.body.clientID,req.body.dateStart,req.body.dateEnd,req.body.hotelName,req.body.price,req.body.balance);
    console.log(updateReservation)
    azureCaller.updateReservation(updateReservation);
    res.send(`Finished updating reservation number ${req.body.reservationID}`)
}

async function getAllReservations(req,res){
    console.log('Getting all the reservations...')
    let result = await azureCaller.getAllReservations();
    console.log(result)
    res.send(result)
    console.log('Finished getting all the reservations')
}



module.exports = {
    createReservation,
    deleteReservation,
    getReservation,
    updateReservation,
    getAllReservations
}