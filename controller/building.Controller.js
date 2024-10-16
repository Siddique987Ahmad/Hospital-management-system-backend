const asyncHandler=require('express-async-handler')
const Building=require('../Models/building.Model.js')
const User=require('../Models/user.Model.js')
//create building
//post private admin
const createBuilding=asyncHandler(async(req,res)=>{
const {userid}=req.params
const {name,code,description}=req.body
const user=await User.findById(userid)
if(!user)
{
    res.status(404)
    throw new Error("user not found");
    
}
const building=await Building.create({
    user:userid,
    name,
    code,
    description
})
if(!building)
{
    res.status(404)
    throw new Error("building data not created");
    
}
res.status(200).json(building)

})
// get building detail
// get private admin
const getBuildingDetail=asyncHandler(async(req,res)=>{
    const {id,userid}=req.params
    const user=await User.findById(userid)
if(!user)
{
    res.status(404)
    throw new Error("user not found");
    
}
const building = await Building.findById(id)
//.populate('user','name email')
    if (!building) {
        res.status(404);
        throw new Error('Building not found');
    }
    res.status(200).json({
        _id: building._id,
        name: building.name,
        code: building.code,
        description: building.description,
    })
})


//update building
//put private admin
const updateBuilding=asyncHandler(async(req,res)=>{
    const {userid,id}=req.params
    const {name,code,description}=req.body
    console.log('userid:',userid)

    const user=await User.findById(userid)
if(!user)
{
    res.status(404)
    throw new Error("user not found");
    
}
const building = await Building.findById(id);
    if (!building) {
        res.status(404);
        throw new Error('Building not found');
    }


  // Update fields if provided in the request body
  if (name) building.name = name;
  if (code) building.code = code;
  if (description) building.description = description;

  const updatedBuilding=await Building.findByIdAndUpdate(id,req.body,{new:true})
  res.status(200).json(updatedBuilding)
//   res.status(200).json({
//     _id: updatedBuilding._id,
//         name: updatedBuilding.name,
//         code: updatedBuilding.code,
//         description: updatedBuilding.description,
//   });

})
//delete building
//delete private admin
const deleteBuildingDetail = asyncHandler(async (req, res) => {
    const { id, userid } = req.params; // Get building ID and user ID from route params

    // Validate the user (optional)
    const user = await User.findById(userid);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Find and delete the building by ID
    const building = await Building.findById(id);
    if (!building) {
        res.status(404);
        throw new Error('Building not found');
    }

   

    await building.deleteOne({_id:id}); // Delete the building

    // Send a success response
    res.status(200).json({ message: `Building with ID ${id} deleted successfully` });
});

module.exports={createBuilding,updateBuilding,getBuildingDetail,deleteBuildingDetail}