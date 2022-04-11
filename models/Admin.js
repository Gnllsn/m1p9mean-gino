const mongoose = require('mongoose');

const Admin = mongoose.Schema({
	nom : String,
	email : String , 
	password : String  
}) 

module.exports = mongoose.model('Admin',Admin)
