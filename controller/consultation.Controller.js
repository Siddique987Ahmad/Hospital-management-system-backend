const asyncHandler=require('express-async-handler')
const User=require('../Models/user.Model')
const ConsultCategory=require('../Models/consultCategory.Model.js')
const Consultation=require('../Models/consultation.Model.js')
const DoctorDetail=require('../Models/doctorDetail.Model.js')
//create consultation
//post private admin
const createConsultation=asyncHandler(async(req,res)=>{
    const { userid } = req.params;
    const { name, description, paid, approved, doc } = req.body  
    const user=await User.findById(userid)
if(!user)
{
    res.status(404)
    throw new Error("user not found");
}
    // Validate if the consult category (name) exists
    const consultCategory = await ConsultCategory.findById(name);
    if (!consultCategory) {
      res.status(404);
      throw new Error('consult category not found');
    }
  
    // Validate if the doctor detail exists
    const doctorDetail = await DoctorDetail.findById(doc);
    if (!doctorDetail) {
      res.status(404);
      throw new Error('doctor detail not found');
    }
  
  
    // Create the consulation
    const consulation =await Consultation.create({
      user:userid,
      name,
      description,
      paid:paid || 'Un-paid',
      approved:approved || false,
      doc
    });
if(!consulation)
    {
        res.status(404)
        throw new Error("consultation not found");
        
    }  
    res.status(201).json(consulation);
  
})
//get consultation detail
//get private admin
const getConsultationDetail=asyncHandler(async(req,res)=>{
    const {userid,id}=req.params
    const user=await User.findById(userid)
if(!user)
{
    res.status(404)
    throw new Error("user not found");
}
const consulation=await Consultation.findById(id)
if(!consulation)
{
    res.status(404)
    throw new Error("consultation not found");
    
}
//const expenseDetail=await Expense.findById(id,req.body,{new:true})
res.status(200).json(consulation)
})
//update consultation
//update private admin
const updateConsultation=asyncHandler(async(req,res)=>{
    const {id,userid}=req.params
    const user=await User.findById(userid)
    if(!user)
        {
            res.status(404)
            throw new Error("user not found");
        }
        const consulation=await Consultation.findById(id)
        if(!consulation)
        {
            res.status(404)
            throw new Error("consultation not found");
            
        }
        const updatedConsultation=await Consultation.findByIdAndUpdate(id,req.body,{new:true})
        if(!updatedConsultation)
            {
                res.status(404)
                throw new Error("updated consultation not found");
                
            }
            res.status(200).json(updatedConsultation)
    
})
//delete consultation
//delete private admin
const deleteConsultation=asyncHandler(async(req,res)=>{
    const {id,userid}=req.params
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }
    const deletedConsultation=await Consultation.findByIdAndDelete(id)

    if(!deletedConsultation)
    {
        res.status(404)
        throw new Error("deleted consultation not found");
        
    }

    res.status(200).json(deletedConsultation)

})
//get consultation list
// get private admin
const getConsultationList=asyncHandler(async(req,res)=>{
    const {userid}=req.params
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }

    const consulationDetail=await Consultation.find({})
    if(!consulationDetail)
    {
        res.status(404)
        throw new Error("consultation not found");
        
    }
    res.status(200).json(consulationDetail)

})
module.exports={createConsultation,getConsultationDetail,updateConsultation,deleteConsultation,getConsultationList} 