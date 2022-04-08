const mongoose = require("mongoose");

const employeePersonalSchema = new mongoose.Schema({
    fName : { type: String, required : true },
    lName : { type: String, required : true },
    empID : { type: String, required : true },
    birthDay : { type: Date, required : true },
    gender : { type: String, required : true },
    mail : { type: String, required : true },
    materialStatus : { type: String, required : true },
    Department : { type: String, required : true },
    TypeofEmployee : { type: String, required : true },
   
});

const EmployeePersonal = mongoose.model("EmployeePersonal",employeePersonalSchema);

module.exports = EmployeePersonal;
