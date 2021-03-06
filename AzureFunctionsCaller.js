const axios = require('axios').default;

//This file calls Azure functions
async function createClient(client){
    console.log(client)
    await axios.post('https://travelreservations.azurewebsites.net/api/createclient?code=0ifk96BOof7drCzzcUrCyeqU2KEooSWkwjafY7PZY97iC7SmlNbRNg%3D%3D',{
        firstName: client.firstName,lastName:client.lastName,streetAddress:client.streetAddress,city:client.city
    },function(error,response,body){
        if(!error && response.statusCode == 200){
            console.log(body);
        }
    }).then(function(response){
        console.log("Success!");

    }).catch(function(error){
        console.log(error)
    })
}


async function deleteClient(client){
    await axios.delete('https://travelreservations.azurewebsites.net/api/createclient?code=0ifk96BOof7drCzzcUrCyeqU2KEooSWkwjafY7PZY97iC7SmlNbRNg%3D%3D',{
        data:{clientID:client.clientID}
    },function(error,response,body){
        if(!error && response.statusCode == 200){
            console.log(body);
        }
    }).then(function(response){
        console.log("Success!");

    }).catch(function(error){
        console.log(error)
    })
}

async function getClient(client){
    return axios.get('https://travelreservations.azurewebsites.net/api/createclient?code=0ifk96BOof7drCzzcUrCyeqU2KEooSWkwjafY7PZY97iC7SmlNbRNg%3D%3D',{
            data:{clientID:client.clientID}
    },function(error,response,body){
        if(!error && response.statusCode == 200){
            //console.log(body);
        }
    }).then(function(response){
        console.log("Success!");
        return response.data

    }).catch(function(error){
        console.log(error)
    })
}

async function updateClient(client){
    await axios.put('https://travelreservations.azurewebsites.net/api/createclient?code=0ifk96BOof7drCzzcUrCyeqU2KEooSWkwjafY7PZY97iC7SmlNbRNg%3D%3D',{
        clientID:client.clientID, firstName: client.firstName,lastName:client.lastName,streetAddress:client.streetAddress,city:client.city
    },function(error,response,body){
        if(!error && response.statusCode == 200){
            console.log(body);
        }
    }).then(function(response){
        console.log("Success!");

    }).catch(function(error){
        console.log(error)
    })
}

async function getAllClients(){
    return axios.get('https://travelreservations.azurewebsites.net/api/AllClients?code=e7aZWatZm/swuM4Ufzy3UcSecVsTPYBRACoVHy39RR/LcsuC/0gZRg==',{
    },function(error,response,body){
        if(!error && response.statusCode == 200){
            //console.log(body);
        }
    }).then(function(response){
        console.log("Success!");
        return response.data

    }).catch(function(error){
        console.log(error)
    })
}

async function allReservationsClient(clientID){
    return axios.post('https://travelreservations.azurewebsites.net/api/AllReservations?code=PxMXQGUrDh6SNNbZDFnNNsdSTcHUEqL5Q1LXEFjEAPSfcJtt8/fBwg==',{
        clientID:clientID
    },function(error,response,body){
        if(!error && response.statusCode == 200){
            //console.log(body);
        }
    }).then(function(response){
        console.log("Success!");
        return response.data

    }).catch(function(error){
        console.log(error)
    })
}



//Below are for Reservation
async function createReservation(reservation){
    await axios.post('https://travelreservations.azurewebsites.net/api/Reservation?code=qhPkB63BwIo62NiglfxPPlcRz98vZWT/XCxx1Fi5iDOonLKBAZ68AA==',{
        clientID: reservation.clientID,dateStart: reservation.dateStart,dateEnd:reservation.dateEnd,hotelName:reservation.hotelName,price:reservation.price,balance:reservation.balance
    },function(error,response,body){
        if(!error && response.statusCode == 200){
            console.log(body);
        }
    }).then(function(response){
        console.log("Success!");

    }).catch(function(error){
        console.log(error)
    })
}

async function deleteReservation(reservation){
    await axios.delete('https://travelreservations.azurewebsites.net/api/Reservation?code=qhPkB63BwIo62NiglfxPPlcRz98vZWT/XCxx1Fi5iDOonLKBAZ68AA==',{
        data:{reservationID:reservation.reservationID}
    },function(error,response,body){
        if(!error && response.statusCode == 200){
            console.log(body);
        }
    }).then(function(response){
        console.log("Success!");

    }).catch(function(error){
        console.log(error)
    })
}

async function getReservation(reservation){
    return axios.get('https://travelreservations.azurewebsites.net/api/Reservation?code=qhPkB63BwIo62NiglfxPPlcRz98vZWT/XCxx1Fi5iDOonLKBAZ68AA==',{
        data:{reservationID:reservation.reservationID}
    },function(error,response,body){
        if(!error && response.statusCode == 200){
            console.log(body);
        }
    }).then(function(response){
        console.log("Success!");
        return response.data

    }).catch(function(error){
        console.log(error)
    })
}

async function updateReservation(reservation){
    await axios.put('https://travelreservations.azurewebsites.net/api/Reservation?code=qhPkB63BwIo62NiglfxPPlcRz98vZWT/XCxx1Fi5iDOonLKBAZ68AA==',{
        reservationID:reservation.reservationID,clientID: reservation.clientID,dateStart: reservation.dateStart,dateEnd:reservation.dateEnd,hotelName:reservation.hotelName,price:reservation.price,balance:reservation.balance
    },function(error,response,body){
        if(!error && response.statusCode == 200){
            console.log(body);
        }
    }).then(function(response){
        console.log("Success!");

    }).catch(function(error){
        console.log(error)
    })
}

async function getAllReservations(){
    return axios.get('https://travelreservations.azurewebsites.net/api/AllReservations?code=PxMXQGUrDh6SNNbZDFnNNsdSTcHUEqL5Q1LXEFjEAPSfcJtt8/fBwg==',{
    },function(error,response,body){
        if(!error && response.statusCode == 200){
            console.log(body);
        }
    }).then(function(response){
        console.log("Success!");
        return response.data

    }).catch(function(error){
        console.log(error)
    })
}

module.exports = {
    createClient,
    deleteClient,
    getClient,
    updateClient,
    getAllClients,
    allReservationsClient,

    createReservation,
    deleteReservation,
    getReservation,
    updateReservation,
    getAllReservations
}