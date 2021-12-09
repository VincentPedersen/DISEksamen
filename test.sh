#Have to update the client/reservation ID in the delete requests if the script is run more than once
RED='\033[0;31m'
NC='\033[0m' # No Color
CYAN='\033[0;36m'

echo "${CYAN}The testing has started${NC}"

curl -k -X GET "https://localhost:4200/allClients" -H "Content-Type: application/json"


echo "\n"

echo  "${RED}Type 1 and hit enter to continue the test ${NC}"
select continue in "CONTINUE"; do
    case $continue in
        CONTINUE) break;;
    esac
done

curl -k -X POST "https://localhost:4200/createClient" -H "Content-Type: application/json" -d'{"firstName":"Anna","lastName": "Pedersen","streetAddress":"Pizzaboulevard 300","city":"Vordingborg"}'

echo "\n"

echo  "${RED}Type 1 and hit enter to continue the test ${NC}"
select continue in "CONTINUE"; do
    case $continue in
        CONTINUE) break;;
    esac
done



curl -k -X GET "https://localhost:4200/allClients" -H "Content-Type: application/json"


echo "\n"

echo  "${RED}Type 1 and hit enter to continue the test ${NC}"
select continue in "CONTINUE"; do
    case $continue in
        CONTINUE) break;;
    esac
done

 

curl -k -X GET "https://localhost:4200/createClient" -H "Content-Type: application/json" -d'{"clientID":1}'

echo "\n"

echo  "${RED}Type 1 and hit enter to continue the test ${NC}"
select continue in "CONTINUE"; do
    case $continue in
        CONTINUE) break;;
    esac
done

curl -k -X PUT "https://localhost:4200/createClient" -H "Content-Type: application/json" -d '{"clientID":1,"firstName":"Vincent","lastName": "Pedersen","streetAddress":"Boring Street","city":"Boring city"}'

echo "\n"

echo  "${RED}Type 1 and hit enter to continue the test ${NC}"
select continue in "CONTINUE"; do
    case $continue in
        CONTINUE) break;;
    esac
done

curl -k -X GET "https://localhost:4200/createClient" -H "Content-Type: application/json" -d'{"clientID":1}'

echo "\n"

echo  "${RED}Type 1 and hit enter to continue the test ${NC}"
select continue in "CONTINUE"; do
    case $continue in
        CONTINUE) break;;
    esac
done 

curl -k -X GET "https://localhost:4200/allClients" -H "Content-Type: application/json"

echo "\n"

echo  "${RED}Type 1 and hit enter to continue the test ${NC}"
select continue in "CONTINUE"; do
    case $continue in
        CONTINUE) break;;
    esac
done


curl -k -X DELETE "https://localhost:4200/createClient" -H "Content-Type: application/json" -d'{"clientID":16}'

echo "\n"

echo  "${RED}Type 1 and hit enter to continue the test ${NC}"
select continue in "CONTINUE"; do
    case $continue in
        CONTINUE) break;;
    esac
done

curl -k -X GET "https://localhost:4200/allClients" -H "Content-Type: application/json"


#Starts the reservation test
echo "\n"

echo  "${RED}Type 1 and hit enter when you are ready to go the reservation tests ${NC}"
select continue in "CONTINUE"; do
    case $continue in
        CONTINUE) break;;
    esac
done


curl -k -X GET "https://localhost:4200/allReservations" -H "Content-Type: application/json"


echo "\n"

echo  "${RED}Type 1 and hit enter to continue the test ${NC}"
select continue in "CONTINUE"; do
    case $continue in
        CONTINUE) break;;
    esac
done

curl -k -X POST "https://localhost:4200/reservation" -H "Content-Type: application/json" -d'{"clientID": 1,"dateStart": "2022.07.20","dateEnd":"2022.07.29","hotelName": "Sheraton","price": 700.00,"balance": 5000 }'

echo "\n"

echo  "${RED}Type 1 and hit enter to continue the test ${NC}"
select continue in "CONTINUE"; do
    case $continue in
        CONTINUE) break;;
    esac
done 

curl -k -X GET "https://localhost:4200/allReservations" -H "Content-Type: application/json"

echo "\n"

echo  "${RED}Type 1 and hit enter to continue the test ${NC}"
select continue in "CONTINUE"; do
    case $continue in
        CONTINUE) break;;
    esac
done 

curl -k -X GET "https://localhost:4200/reservation" -H "Content-Type: application/json" -d'{"reservationID":12}'


echo "\n"

echo  "${RED}Type 1 and hit enter to continue the test ${NC}"
select continue in "CONTINUE"; do
    case $continue in
        CONTINUE) break;;
    esac
done

curl -k -X PUT "https://localhost:4200/reservation" -H "Content-Type: application/json" -d'{"reservationID":12,"clientID": 1,"dateStart": "2022.07.18","dateEnd":"2022.07.30","hotelName": "Hilton","price": 1000.00,"balance": 4000.35 }'

echo "\n"

echo  "${RED}Type 1 and hit enter to continue the test ${NC}"
select continue in "CONTINUE"; do
    case $continue in
        CONTINUE) break;;
    esac
done

curl -k -X GET "https://localhost:4200/reservation" -H "Content-Type: application/json" -d'{"reservationID":12}'

echo "\n"

echo  "${RED}Type 1 and hit enter to continue the test ${NC}"
select continue in "CONTINUE"; do
    case $continue in
        CONTINUE) break;;
    esac
done

curl -k -X GET "https://localhost:4200/allReservations" -H "Content-Type: application/json"

echo "\n"

echo  "${RED}Type 1 and hit enter to continue the test ${NC}"
select continue in "CONTINUE"; do
    case $continue in
        CONTINUE) break;;
    esac
done

curl -k -X DELETE "https://localhost:4200/reservation" -H "Content-Type: application/json" -d'{"reservationID":18}'


echo "\n"

echo  "${RED}Type 1 and hit enter to continue the test ${NC}"
select continue in "CONTINUE"; do
    case $continue in
        CONTINUE) break;;
    esac
done

curl -k -X GET "https://localhost:4200/allReservations" -H "Content-Type: application/json"


echo "${CYAN}The testing has now ended${NC}"