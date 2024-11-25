const Contact = require('../Models/contactUsModel');

// handle contact form submission
const submitContactForm = async (req, res) =>{
    try{
        const contactData = req.body;
        const newContact = new Contact(contactData);
        await newContact.save();
        res.status(201).json({message:"Contact submitted successfully"})
    }catch(error){
        res.status(400).json({message:"Error submitting contact form", error});
    }
}
module.exports = {submitContactForm};