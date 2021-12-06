const axios = require('axios').default;


function createClient(){
    axios.post('https://TravelReservation.azurewebsites.net/api/createClient')
}