const User = require("../Models/user.Model");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken.js");
//register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, about } = req.body;

  if (!name || !email || !password || !about) {
    res.status(403);
    throw new Error("Fields required");
  }
  const emailExisted = await User.findOne({ email });
  //console.log(emailExisted);
  if (emailExisted) {
    res.status(401);
    throw new Error("Email already existed");
  }
  // If role is not provided, set it to 1 (default for regular users)
  const userRole = role !== undefined ? role : 1;

  const user = await User.create({
    name,
    email,
    password,
    role: userRole,
    about,
  });
  if (user) {
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      about: user.about,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user");
  }
});
//Authenticate user
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401);
    throw new Error("fields required");
  }
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      about: user.about,
      token: generateToken(user.id),
    });
    res.status(200).json("User login", user);
  } else {
    res.status(401);
    throw new Error("invalid email or password");
  }
});

////Get User Profile through id
//private
const getUserProfile = asyncHandler(async (req, res) => {
  // const {_id}=req.params
  // if(!_id)
  // {
  //     res.status(400)
  //     throw new Error("not here id");

  // }
  const user = await User.findById(req.user.id);
  if (user) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      about: user.about,
    });
  } else {
    res.status(401);
    throw new Error("invaild id");
  }
});
//Update user profile
//private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    (user.role = req.body.role || user.role),
      (user.about = req.body.about || user.about);
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      about: updatedUser.about,
      token: generateToken(user.id),
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
  // if(!updatedUser)
  // {
  //     res.status(404)
  //     throw new Error("user not found");

  // }
  // res.json({
  //     name:user.name,
  //     email:user.email,
  //     role:user.role,
  //     about:user.about,
  //     token:generateToken(user.id)
  // })
});
//delete private/admin
const deleteUser = asyncHandler(async (req, res) => {
  //const {id}=req.params
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const deletedUser = await User.findByIdAndDelete(user.id);
  if (!deletedUser) {
    res.status(404);
    throw new Error("Deleted user not found");
  }
  res.status(200).json(deletedUser);
});
//nothing
const getUserById=asyncHandler(async(req,res)=>{
const user=await User.findById(req.params.id).select("-password")
if(!user)
{
    res.status(404)
    throw new Error("user not found");
    
}
res.status(200).json("Here is user:",user)
})
//update user
//private/admin
const updateUser=asyncHandler(async(req,res)=>{
   // const userRole = role !== undefined ? role : 1;

    const user = await User.findById(req.user.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    (user.role = req.body.role || user.role),
      (user.about = req.body.about || user.about);
    if (req.body.password) {
      user.password = req.body.password;
    }
    // const user = await User.create({
    //     name,
    //     email,
    //     password,
    //     role: userRole,
    //     about,
    //   });
    const updatedUser = await user.save();
    res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      about: updatedUser.about,
      token: generateToken(user.id),
    });
  } else {
    res.status(404);
    throw new Error("user not found");
}
})
//get users
//private/admin
const getAllUsers=asyncHandler(async(req,res)=>{
const user=await User.find({})
res.json(user,"All users")
})

const registerUsers=asyncHandler(async(req,res)=>{
const {name,email,password,confirmPassword,role}=req.body
// if(!name || !email || !password || !role)
// {
//   res.status(404)
//   throw new Error("Fields required");
  
// }
const userExist=await User.findOne({email})
if(userExist)
{
  res.status(400)
  throw new Error("user already exist");
  
}
if (password !== confirmPassword) {
  throw new Error("password and confirm password not match");
  
}
const userRole = role !== undefined ? role : 1;

const user=await User.create({
  name,
  email,
  password,
  role:userRole
})
if(user)
{
  res.status(200).json({
    id:user.id,
    name:user.name,
    email:user.email,
    role:user.role,
    token:generateToken(user.id),
  })
}
else
{
  res.status(400)
  throw new Error("user not register");
  
}

})




module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserById,
  updateUser,
  getAllUsers,
  registerUsers

};
