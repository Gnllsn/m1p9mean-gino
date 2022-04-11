const mongoose = require('mongoose');
const Role = require('./Role');
const User = mongoose.Schema({
	nom : String,
	email : String , 
	password : String , 
}) 

module.exports = mongoose.model('User',User)
