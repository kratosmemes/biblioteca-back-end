const fs = require('fs');
const path = require('path');
const nodeUtils = require('util');
const log_route = (`${path.resolve(__dirname, "../")+("/Logs/log.txt")}`);
const usuarioModel = require('../models/usuario');

/************************************************/
/** Start functionality of creating a log file **/
/************************************************/

const log = (message) => {

    //Printing message to console dev only // Delete when prod or deploy
    console.log(message);

    if(typeof message == "string"){
        //Appending message to the log file if is a String
        fs.appendFile(log_route, `${getFullDate()} | ${message} \n` , (res) => {});
    }else{
        //Appendig message to the log file if is an Object
        fs.appendFile(log_route, `${getFullDate()} | ${nodeUtils.inspect(message)} \n` , (res) => {});
    }
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

/************************************************/
/*** End functionality of creating a log file ***/
/************************************************/

JsonFieldIsUndefined = (JsonObject, path) => {
    try {
        JsonObject.errors[path];
        log(JsonObject.errors[path] + "Desde el metodo de arriba");
        return false;
    }catch(err){
        return true;
    }
}

VerificaJson = (error) => {

    usuarioModel.schema.eachPath(function(path) {  
        let campo = new String(path);
        let isUndefined = this.JsonFieldIsUndefined(error, campo);
        log(isUndefined);
        if(isUndefined){

        }else {
          /*   log("The next fileds must be unique and diferents");
            log(error.errors[campo]); */
        }
   
    });
} 

module.exports = {
    log,
    JsonFieldIsUndefined,
    VerificaJson
};