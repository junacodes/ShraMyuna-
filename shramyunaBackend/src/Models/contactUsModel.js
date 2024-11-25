const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName : {type:String, required:true},
    email: {type:String, required:true},
    phone:{type:String, required: true},
    address:{type:String, required:true},
    city:{type:String, required:true},
    country:{type:String, required:true },
    pincode:{type:String, required:true},
    state:{type:String, required:true},
    message:{type:String, required:true}
},{timestamps:true});


const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
