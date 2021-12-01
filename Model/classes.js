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
    constructor(ReservationID,clientID,date,hotelName,price,balance){
        this.ReservationID = ReservationID;
        this.clientID = clientID; 
        this.date = date; 
        this.hotelName = hotelName; 
        this.price = price; 
        this.balance = balance; 
    }
}