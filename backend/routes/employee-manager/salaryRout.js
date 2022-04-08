const router = require("express").Router();
const Attendant = require("../../models/employee-manager/salaryModel");

//Add new attendant sheet
router.post('/',async(req,res)=>{
    try{
        // const {mail,startTime,endTime} = req.body;
       
        // const newRow = new Attendant({
        //     mail,startTime,endTime
        // });

        const savedAttendant = await Attendant.create(req.body);
        res.status(200).send({data : savedAttendant});

    }catch(err){
        res.status(500).send({status : err});
    }
})



//View all attendant
router.get('/', async(req,res)=>{
    try{
        const allAttendant = await Attendant.find();
        res.status(200).send({data : allAttendant});
    }catch(err){
        res.status(500).send({data : err});
    }
})

module.exports = router;