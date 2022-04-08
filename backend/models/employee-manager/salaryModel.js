const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
    mail : { type: String, required : true },
    ratePerHour : { type: Number, required : true },
    otPerHour : { type: Number, required : true },
    workedHour : { type: Number, required : true },
    workingDay : { type: Number, required : true },
    otRate : { type: Number, required : true },
    total : { type: Number, required : true },
});

const Salary = mongoose.model("Salary",salarySchema);

module.exports = Salary;
