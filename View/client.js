//Handles front-end JS
function getSpecificClient(){
    let userID = document.getElementById('specId').value;

    if (userID==''){
        document.getElementById('box').innerHTML = ""
        document.getElementById('box').innerHTML = "Please choose a clientID"
    } else {
    axios.get(`https://localhost:4200/createClient?clientID=${userID}`,{
    }).then((res ) =>{
        document.getElementById('box').innerHTML = "";
       console.log(res.data)
       let client = res.data;
       var tag = document.createElement('p');
       var text = document.createTextNode(JSON.stringify(client))
       tag.appendChild(text)
       box.appendChild(tag)

    }).catch(function(err){
        console.log(err)
    })

    axios.post(`https://localhost:4200/allClients`,{
        clientID:userID
    }).then((res ) =>{
        document.getElementById('box2').innerHTML = "";
       console.log(res.data)
       let client = res.data;
       var tag = document.createElement('p');
       var text = document.createTextNode(JSON.stringify(client))
       tag.appendChild(text)
       box2.appendChild(tag)

    }).catch(function(err){
        console.log(err)
    })

    
}
}

function getAllClients(){ //This function sends a get request without a specified user id in order to get all reservations
    axios.get(`https://localhost:4200/allClients`,{
            
    })
    .then((res) => {
        document.getElementById('box').innerHTML = "";
        console.log(res.data)
        let allUsers = res.data;
        
        for(let i=0; i<allUsers.length; i++){ //this loop makes sure new elements will be created in html depending on the amount of users
            var tag = document.createElement('p');
            var text = document.createTextNode(JSON.stringify(allUsers[i]))
            tag.appendChild(text)
            box.appendChild(tag)
        }  
    })
    .catch((err) => {
        console.log(err)
    })
}

function getSpecificReservation(){
    let reservationID = document.getElementById('spec2Id').value;
    if (reservationID==''){
        document.getElementById('box2').innerHTML = "Please choose a reservationID"
    } else {
    axios.get(`https://localhost:4200/reservation?reservationID=${reservationID}`,{
    }).then((res ) =>{
        document.getElementById('box2').innerHTML = "";
       console.log(res.data)
       let allReservations = res.data;
       var tag = document.createElement('p');
       var text = document.createTextNode(JSON.stringify(allReservations))
       tag.appendChild(text)
       box2.appendChild(tag)

    }).catch(function(err){
        console.log(err)
    })
}
}

function getAllReservations(){
    axios.get(`https://localhost:4200/allReservations`,{
            
    })
    .then((res) => {
        document.getElementById('box2').innerHTML = "";
        console.log(res.data)
        let allReservations = res.data;
        
        for(let i=0; i<allReservations.length; i++){ //this loop makes sure new elements will be created in html depending on the amount of users
            var tag = document.createElement('p');
            var text = document.createTextNode(JSON.stringify(allReservations[i]))
            tag.appendChild(text)
            box2.appendChild(tag)
        }  
    })
    .catch((err) => {
        console.log(err)
    })
}

function createClient(){
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let streetAddress = document.getElementById('streetAddress').value;
    let city = document.getElementById('city').value
    if (firstName==''||lastName==''||streetAddress==''||city==''){
        document.getElementById('box3').innerHTML = ""
        document.getElementById('box3').innerHTML = "Please insert data before pressing submit";
    } else {

    axios.post(`https://localhost:4200/createClient`,{
        firstName:firstName,lastName:lastName,streetAddress:streetAddress,city:city
    }).then((res ) =>{
        document.getElementById('box3').innerHTML = "";
       console.log(res.data)
       let response = res.data;
       var tag = document.createElement('p');
       var text = document.createTextNode(JSON.stringify(response))
       tag.appendChild(text)
       box3.appendChild(tag)

    }).catch(function(err){
        console.log(err)
    })
    
    document.getElementById('createClient').reset()
}
}

function createReservation(){
    let clientID = document.getElementById('clientIDRes').value;
    let dateStart = document.getElementById('dateStart').value;
    let dateEnd = document.getElementById('dateEnd').value;
    let hotelName = document.getElementById('hotelName').value;
    let price = document.getElementById('price').value;
    let balance = document.getElementById('balance').value;

    if (clientID==''||dateStart==''||dateEnd==''||hotelName==''||price==''||balance==''){
        document.getElementById('box3').innerHTML = ""
        document.getElementById('box3').innerHTML = "Please insert data before pressing submit";
    } else {

    axios.post(`https://localhost:4200/reservation`,{
        clientID:clientID,dateStart:dateStart,dateEnd:dateEnd,hotelName:hotelName,price:price,balance:balance
    }).then((res ) =>{
        document.getElementById('box3').innerHTML = "";
       console.log(res.data)
       let response = res.data;
       var tag = document.createElement('p');
       var text = document.createTextNode(JSON.stringify(response))
       tag.appendChild(text)
       box3.appendChild(tag)

    }).catch(function(err){
        console.log(err)
    })
    
    document.getElementById('createReservation').reset()
}
}

function deleteClient(){
    let userID = document.getElementById('deleteClientID').value;

    if (userID==''){
        document.getElementById('box4').innerHTML = ""
        document.getElementById('box4').innerHTML = "Please choose a clientID"
    } else {
    axios.delete(`https://localhost:4200/createClient?clientID=${userID}`,{
    }).then((res ) =>{
        document.getElementById('box4').innerHTML = "";
       console.log(res.data)
       let client = res.data;
       var tag = document.createElement('p');
       var text = document.createTextNode(JSON.stringify(client))
       tag.appendChild(text)
       box4.appendChild(tag)

    }).catch(function(err){
        console.log(err)
    })

    }
}

function deleteReservation(){
    let reservationID = document.getElementById('deleteReservationID').value;
    if (reservationID==''){
        document.getElementById('box4').innerHTML = ""
        document.getElementById('box4').innerHTML = "Please choose a reservationID"
    } else {
    axios.delete(`https://localhost:4200/reservation?reservationID=${reservationID}`,{
    }).then((res ) =>{
        document.getElementById('box4').innerHTML = "";
       console.log(res.data)
       let allReservations = res.data;
       var tag = document.createElement('p');
       var text = document.createTextNode(JSON.stringify(allReservations))
       tag.appendChild(text)
       box4.appendChild(tag)

    }).catch(function(err){
        console.log(err)
    })
}
}

function updateClient(){
    let clientID = document.getElementById('updateClientID').value;
    let firstName = document.getElementById('updateFirstName').value;
    let lastName = document.getElementById('updateLastName').value;
    let streetAddress = document.getElementById('updateStreetAddress').value;
    let city = document.getElementById('updateCity').value
    if (clientID==''||firstName==''||lastName==''||streetAddress==''||city==''){
        document.getElementById('box3').innerHTML = ""
        document.getElementById('box3').innerHTML = "Please insert data before pressing submit";
    } else {

    axios.put(`https://localhost:4200/createClient`,{
        clientID:clientID,firstName:firstName,lastName:lastName,streetAddress:streetAddress,city:city
    }).then((res ) =>{
        document.getElementById('box3').innerHTML = "";
       console.log(res.data)
       let response = res.data;
       var tag = document.createElement('p');
       var text = document.createTextNode(JSON.stringify(response))
       tag.appendChild(text)
       box3.appendChild(tag)

    }).catch(function(err){
        console.log(err)
    })
    
    document.getElementById('updateClient').reset()
}
}

function updateReservation(){
    let reservationID = document.getElementById('updateReservationID').value;
    let clientID = document.getElementById('updateReservationClientID').value;
    let dateStart = document.getElementById('updateReservationDateStart').value;
    let dateEnd = document.getElementById('updateReservationDateEnd').value;
    let hotelName = document.getElementById('updateReservationHotelName').value;
    let price = document.getElementById('updateReservationPrice').value;
    let balance = document.getElementById('updateReservationBalance').value;

    if (reservationID==''||clientID==''||dateStart==''||dateEnd==''||hotelName==''||price==''||balance==''){
        document.getElementById('box3').innerHTML = ""
        document.getElementById('box3').innerHTML = "Please insert data before pressing submit";
    } else {

    axios.put(`https://localhost:4200/reservation`,{
        reservationID:reservationID,clientID:clientID,dateStart:dateStart,dateEnd:dateEnd,hotelName:hotelName,price:price,balance:balance
    }).then((res ) =>{
        document.getElementById('box3').innerHTML = "";
       console.log(res.data)
       let response = res.data;
       var tag = document.createElement('p');
       var text = document.createTextNode(JSON.stringify(response))
       tag.appendChild(text)
       box3.appendChild(tag)

    }).catch(function(err){
        console.log(err)
    })
    
    document.getElementById('createReservation').reset()
}
}



