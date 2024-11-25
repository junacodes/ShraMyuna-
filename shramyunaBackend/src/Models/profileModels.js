const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema(
    {
        user:{
            type : mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        email:{
            type: String,

        },

        firstName: {
            type:String,
            
        },
        lastName:{
            type:String
        },
   

        phone: {
            type:String
        },

        address:{
            type:String,

        },
        
       
        userRole:{
            type:String,
            enum : ["user", "admin", "superAdmin"],
            required: true,
            default: "user",
        },
        
    profilePic: {
        type: String,
        required: false,
      },
    },
        {
            timestamps:true
        }

    
);
const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile
