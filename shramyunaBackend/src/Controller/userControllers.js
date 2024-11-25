const User = require("../Models/userModels")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Profile = require("../Models/profileModels");

const userRegister = async (req, res) => {
    const data = req.body;
    // const name = data.name
if(!data.email || !data.password){
   return res.status(400).json({msg:"please enter your email and password"});
};
try {
    const user = await User.findOne({ email: data.email });
    if (user) {
       return res.status(400).json({ msg: "User already exists" });
    }
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: data.password,
      userRole: data.userRole,
    });
  
    const newProfile = new Profile({
      user:newUser._id
    })
     
    const profileResponse = await newProfile.save()

    const response = await newUser.save();
    return res.status(201).json({msg: "user registered successfully  ", user: response });


 }

 catch(err){
    console.log(err);
    res.status(500).json({msg:"server error", error: err})
 }
};


// controller for user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "YOUR_SECRET_KEY", { expiresIn: "1h" });
    res.status(200).json({ user: user._id, token });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
 };
 
 module.exports = { userRegister, loginUser };


 