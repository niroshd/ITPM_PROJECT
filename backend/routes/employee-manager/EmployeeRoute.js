const router = require("express").Router();
const Employee = require("../../models/employee-manager/employeeModel");

//Add new vehicle
router.post('/',async(req,res)=>{
    try{
        // const {fName,lName,birthDay,gender,mail,materialStatus,Department,TypeofEmployee} = req.body;
       
        // const newEmployee = new Employee({
        //     fName,lName,birthDay,gender,mail,materialStatus,Department,TypeofEmployee
        // });

        const savedEmployee = await Employee.create(req.body);
        res.status(200).send({data : savedEmployee});

    }catch(err){
        res.status(500).send({status : err});
    }
})



//View all vehicles
router.get('/', async(req,res)=>{
    try{
        const allEmployees = await Employee.find();
        res.status(200).send({data : allEmployees});
    }catch(err){
        res.status(500).send({data : err});
    }
})



//update vehicles
router.put("/:id", async(req,res)=>{
    try{
        let _id = req.params.id;
        const {fName,lName,birthDay,gender,mail,materialStatus,Department,TypeofEmployee} = req.body;


        const updateEmployee = new Employee({
           _id, fName,lName,birthDay,gender,mail,materialStatus,Department,TypeofEmployee
        });

        await Employee.findByIdAndUpdate(_id,updateEmployee)
        res.status(200).send({data : updateEmployee});
             
    }catch(err){
        res.status(500).send({data : err});
    }
})


//This route used to view specific vehicle from table
router.get('/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const employee = await Employee.find({_id : id})
        res.status(200).send({data : employee});

    }catch(err){
        res.status(500).send({data : err});
    }

})


//This route used to delete vehicle from table
router.delete('/:id',async(req,res)=>{

    try{
        const id = req.params.id;
        const removedEmployee = await Employee.findByIdAndDelete(id)
        res.status(200).send({data : removedEmployee});
    

    }catch(err){
        res.status(500).send({data : err});
    }

})

module.exports = router;