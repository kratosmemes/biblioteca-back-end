const fs = require('fs');
const path = require('path');

const log_route = (`${path.join("./Logs/log.txt")}`);

const log = (message) => {
    console.log(message);
    fs.appendFile(log_route, `${getFullDate()} | ${message} \n` , (res) => {});
}

/* Method to obtain full Date */
function getFullDate(){

    let date_ob = new Date();
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();   
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();


    return `${date}/${month}/${year}-${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${(seconds < 10 ? `0${seconds}` : seconds)}`;

}

module.exports = {
    log
};