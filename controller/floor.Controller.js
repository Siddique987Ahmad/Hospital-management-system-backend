const asyncHandler=require('express-async-handler')
const Building=require('../Models/building.Model.js')
const User=require('../Models/user.Model.js')
const Floor=require('../Models/floor.Model.js')
//create floor
//post private admin
const createFloor=asyncHandler(async(req,res)=>{
const {userid}=req.params
const {name,floorCode,building}=req.body
const user=await User.findById(userid)
if(!user)
{
    res.status(404)
    throw new Error("user not found");
    
}
const buildings=await Building.findById(building)
if(!buildings)
{
    res.status(404)
    throw new Error("user not found");
    
}
const floor=await Floor.create({
    user:userid,
    name,
    floorCode,
    building
})

if(!floor)
{
    res.status(404)
    throw new Error("floor data not created");
    
}
res.status(200).json(floor)

})
// get floor detail
// get private admin
const getFloorDetail=asyncHandler(async(req,res)=>{
    const {id,userid}=req.params
    const user=await User.findById(userid)
if(!user)
{
    res.status(404)
    throw new Error("user not found");
    
}
const floor = await Floor.findById(id)
//.populate('user','name email')
    if (!floor) {
        res.status(404);
        throw new Error('floor not found');
    }
    res.status(200).json({
        _id: floor._id,
        name: floor.name,
        floorCode: floor.floorCode,
        building: floor.building,
    })
})


//update floor
//put private admin
const updateFloor=asyncHandler(async(req,res)=>{
    const {userid,id}=req.params
    const {name,building,floorCode}=req.body
    console.log('userid:',userid)
    console.log('floorid:',id)


    const user=await User.findById(userid)
if(!user)
{
    res.status(404)
    throw new Error("user not found");
    
}
const floor = await Floor.findById(id);
console.log('floor',floor)
    if (!floor) {
        res.status(404);
        throw new Error('floor not found');
    }


  // Update fields if provided in the request body
  if (name) floor.name = name;
  if (floorCode) floor.floorCode = floorCode;
  if (building) floor.building = building;

  const updatedFloor=await Floor.findByIdAndUpdate(id,req.body,{new:true})
  res.status(200).json(updatedFloor)
//   res.status(200).json({
//     _id: updatedBuilding._id,
//         name: updatedBuilding.name,
//         code: updatedBuilding.code,
//         description: updatedBuilding.description,
//   });

})
//delete floor
//delete private admin
const deleteFloorDetail = asyncHandler(async (req, res) => {
    const { id, userid } = req.params; // Get building ID and user ID from route params

    // Validate the user (optional)
    const user = await User.findById(userid);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Find and delete the building by ID
    const floor = await Floor.findById(id);
    if (!floor) {
        res.status(404);
        throw new Error('floor not found');
    }

   

    await Floor.deleteOne({_id:id}); // Delete the building

    // Send a success response
    res.status(200).json({ message: `Floor with ID ${id} deleted successfully` });
});

module.exports={createFloor,getFloorDetail,updateFloor,deleteFloorDetail}