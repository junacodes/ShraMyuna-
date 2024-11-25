const Profile = require("../Models/profileModels")



const createProfile = async (req, res) => {
  try {
    const { firstName, phone, address } = req.body;
    const userId = req.user.id; // assuming the user ID is in the token

    // Check if the profile already exists for this user
    const existingProfile = await Profile.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({ msg: 'Profile already exists' });
    }

    // Create new profile
    const newProfile = new Profile({
      user: userId,
      firstName,
      phone,
      address,
      profilePic: req.file ? `uploads/profiles/${req.file.filename}` : 'uploads/profiles/default.jpg', // Default profile pic
    });

    // Save the new profile
    await newProfile.save();

    return res.status(201).json({ msg: 'Profile created successfully', profile: newProfile });
  } catch (err) {
    return res.status(500).json({ msg: 'Server error', error: err.message });
  }
};



const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Access user ID from req.user (populated by the middleware)
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    const { firstName, phone, address } = req.body;
    const profileData = {
      firstName: firstName || profile.firstName,
      phone: phone || profile.phone,
      address: address || profile.address,
    };

    if (req.file) {
      profileData.profilePic = `uploads/profiles/${req.file.filename}`;
    }

    await Profile.updateOne({ user: userId }, { $set: profileData });
    return res.status(200).json({ msg: "Profile updated successfully", profile });
  } catch (err) {
    console.log(err); // Log the error for debugging
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};
//  get profile
    const getProfile= async (req, res) =>{
        try{
           const userId= req.user.id
           const profile = await Profile.findOne({ user: userId }).populate("user",['name','email','userRole']);
           if(!profile){
              return res.status(404).json({msg:"profile is not found"})
           }
           return res
              .status(200)
              .json({ msg: "profile fetched successfully", profile });
        
        }catch(err){
          res.status(500).json({ msg: 'server error' });

        }
      }



  module.exports ={createProfile, updateProfile,  getProfile}