const axios = require('axios').default;


function createClient(client){
    axios.post('https://localhost:7071/api/createClient',{
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