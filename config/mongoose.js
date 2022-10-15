const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/employee-review-sysytm');


const db = mongoose.connection;
db.on('error', console.error.bind("error connecting to the database"));

db.once('open', function () {
    console.log("Succesfully conncted to the database");
});


module.exports = db;