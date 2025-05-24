// this file will just contain all the functions needed to perform based on each type and mode of request
// so that instead of declaring there we can just export it and call them

const asyncHandler = require("express-async-handler");
const Contact=require("../models/contactModel");
// @desc Get contact
// @route GET /api/contacts
// @access public
const getContacts = asyncHandler(async (req, res) => {
  const contacts=await Contact.find({user_id:req.user.id})
  res.status(200).json(contacts);
});

// wrapping the async functions within the asyncHandler helps to not mention try and catch blocks each time
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body; 
  if (!name || !email || !phone) {
    res.status(400); 
    throw new Error("All fields are mandatory");
  }
  const contact=await Contact.create({
    name,
    email,
    phone,
    user_id:req.user.id
  })
  res.status(201).json(contact); 
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access public
const updateContact = asyncHandler(async (req, res) => {
  const contact= await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact Not Found");
}
  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User cannot update contacts created by other users")
  }
  const updateContact=Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  );

  res.status(200).json(updateContact);
});

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User cannot update contacts created by other users")
  }
  await Contact.deleteOne({_id:req.params.id}); // ✅ This deletes the specific contact
  res.status(200).json(contact);
});


// @desc Get specific contact
// @route GET /api/contacts/:id
// @access public
const getContact = asyncHandler(async (req, res) => {
  const contact= await Contact.findById(req.params.id);
  if(!contact){
    res.status(404)
    throw new Error("Contact Not Found")
}
  res.status(200).json(contact);
 });

// Exporting all controller functions
module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
