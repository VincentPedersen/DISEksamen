const axios = require('axios').default;


function createClient(client){
    axios.post('https://travelreservations.azurewebsites.net/api/createClient?code=rEhNgmGMdO3pltbyA0/YONevi/D/eiO13mKV4uNMgjASsLvxzRWbEw==',{
        firstName: client.firstName,lastName:client.lastName,streetAddress:client.streetAddress,city:client.city
    },function(error,response,body){
        if(!error && response.statusCode == 200){
            console.log(body);
        }
    })
}

module.exports = {
    createClient
}