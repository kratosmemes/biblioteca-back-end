const mongoose = require('mongoose');

let VerifyDbStatus = (req, res, next) => {  
    let Database_Status = mongoose.connection.readyState;

    if(Database_Status === 0){
        return res.status(500).json({
            Message: "Error",
            Cause: "Database is not active"
        });
    }

    next();
}

module.exports = {
    VerifyDbStatus
}