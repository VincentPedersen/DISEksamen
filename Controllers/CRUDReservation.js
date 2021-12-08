const classes = require('../Model/classes');
const azureCaller = require('../AzureFunctionsCaller');
const Reservation = classes.Reservations;


function createReservation(req,res){
    let newReservation = new Reservation('',req.body.clientID,req.body.dateStart,req.body.dateEnd,req.body.hotelName,req.body.price,req.body.balance);

    azureCaller.createReservation(newReservation);
    res.end('Creating Reservation')
}

function deleteReservation(req,res){
    let deleteReservation = new Reservation(req.body.reservationID,'','','','','','');

    azureCaller.deleteReservation(deleteReservation);
    res.end('Deleting Reservation')
}

async function getReservation(req,res){
    let getReservation = new Reservation(req.body.reservationID,'','','','','','');

    let result = await azureCaller.getReservation(getReservation);
    res.end(result)
}

function updateReservation(req,res){
    let updateReservation = new Reservation(req.body.reservationID,req.body.clientID,req.body.dateStart,req.body.dateEnd,req.body.hotelName,req.body.price,req.body.balance);

    azureCaller.updateReservation(updateReservation);
    res.end('Updating Reservation')
}



module.exports = {
    createReservation,
    deleteReservation,
    getReservation,
    updateReservation
}