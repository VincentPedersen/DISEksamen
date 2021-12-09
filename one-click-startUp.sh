RED='\033[0;31m'
NC='\033[0m' # No Color

echo  "PID of this script: $$"
SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"/Server
node --no-warnings loadbalancer.js &
sleep 2

node --no-warnings server.js &
node --no-warnings server.js &
node --no-warnings server.js &
node --no-warnings server.js &
node --no-warnings server.js &


sleep 2
echo "\n"

echo  "${RED}Type 1 and enter when you wish to stop the servers ${NC}"
select stop in "STOP"; do
    case $stop in
        STOP) pkill -P $$; break;;
    esac
done


