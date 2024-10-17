const asyncHandler=require('express-async-handler')
const User=require('../Models/user.Model')
const Vaccine=require('../Models/vaccine.Model')
const VaccineAppointment=require('../Models/vaccineAppointment.Model')
const PatientDetail=require('../Models/patientDetail.Model')
//create vaccineAppointment
//post private admin
const createVaccineAppointment=asyncHandler(async(req,res)=>{
    const { userid } = req.params;
    const { patient, nurse, vaccine, date, time_in, taken, day, room, remarks } = req.body;
  
    const user=await User.findById(userid)
if(!user)
{
    res.status(404)
    throw new Error("user not found");
}
    // Validate if the user (patient) exists
    const patientUser = await PatientDetail.findById(patient);
    if (!patientUser) {
      res.status(404);
      throw new Error('Patient not found');
    }
  
    // Validate if the nurse exists
    const nurseUser = await User.findById(nurse);
    if (!nurseUser) {
      res.status(404);
      throw new Error('Nurse not found');
    }
  
    // Validate if the vaccine exists
    const vaccineData = await Vaccine.findById(vaccine);
    if (!vaccineData) {
      res.status(404);
      throw new Error('Vaccine not found');
    }
  
    // Create the vaccine appointment
    const vaccineAppointment =await VaccineAppointment.create({
      patient,
      nurse,
      vaccine,
      date,
      time_in,
      taken,
      day,
      room,
      remarks,
    });
if(!vaccineAppointment)
    {
        res.status(404)
        throw new Error("vaccine appointment not found");
        
    }  
    res.status(201).json(vaccineAppointment);
  
})
//get vaccine appointment detail
//get private admin
const getVaccineAppointmentDetail=asyncHandler(async(req,res)=>{
    const {userid,id}=req.params
    const user=await User.findById(userid)
if(!user)
{
    res.status(404)
    throw new Error("user not found");
}
const vaccineAppointment=await VaccineAppointment.findById(id)
if(!vaccineAppointment)
{
    res.status(404)
    throw new Error("vaccine appointment not found");
    
}
//const expenseDetail=await Expense.findById(id,req.body,{new:true})
res.status(200).json(vaccineAppointment)
})
//update vaccine appointment
//update private admin
const updateVaccineAppointment=asyncHandler(async(req,res)=>{
    const {id,userid}=req.params
    const user=await User.findById(userid)
    if(!user)
        {
            res.status(404)
            throw new Error("user not found");
        }
        const vaccineAppointment=await VaccineAppointment.findById(id)
        if(!vaccineAppointment)
        {
            res.status(404)
            throw new Error("vaccine appointment not found");
            
        }
        const updatedVaccineAppointment=await VaccineAppointment.findByIdAndUpdate(id,req.body,{new:true})
        if(!updatedVaccineAppointment)
            {
                res.status(404)
                throw new Error("updated vaccine appointment not found");
                
            }
            res.status(200).json(updatedVaccineAppointment)
    
})
//delete vaccine appointment
//delete private admin
const deleteVaccineAppointment=asyncHandler(async(req,res)=>{
    const {id,userid}=req.params
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }
    const deletedVaccineAppointment=await VaccineAppointment.findByIdAndDelete(id)

    if(!deletedVaccineAppointment)
    {
        res.status(404)
        throw new Error("deleted vaccine not found");
        
    }

    res.status(200).json(deletedVaccineAppointment)

})
//get vaccine appointment list
// get private admin
const getVaccineappointmentList=asyncHandler(async(req,res)=>{
    const {userid}=req.params
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }

    const vaccineAppointmentDetail=await VaccineAppointment.find({})
    if(!vaccineAppointmentDetail)
    {
        res.status(404)
        throw new Error("vaccine appointments not found");
        
    }
    res.status(200).json(vaccineAppointmentDetail)

})
module.exports={createVaccineAppointment,getVaccineAppointmentDetail,updateVaccineAppointment,deleteVaccineAppointment,getVaccineappointmentList} 