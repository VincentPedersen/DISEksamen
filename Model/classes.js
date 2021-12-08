class Client{
    constructor(clientID,firstName,lastName,streetAddress,city){
        this.clientID = clientID; 
        this.firstName = firstName; 
        this.lastName = lastName; 
        this.streetAddress = streetAddress; 
        this.city = city; 
    }
}

class Reservations{
    constructor(reservationID,clientID,dateStart,dateEnd,hotelName,price,balance){
        this.reservationID = reservationID;
        this.clientID = clientID; 
        this.dateStart = dateStart; 
        this.dateEnd = dateEnd;
        this.hotelName = hotelName; 
        this.price = price; 
        this.balance = balance; 
    }
}

module.exports = {
    Client,
    Reservations
}