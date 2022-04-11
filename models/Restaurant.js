const mongoose = require('mongoose');

const Restaurant = mongoose.Schema({
	nom : String,
	email : String , 
	password : String,
	restaut : String ,
	local : String
});

module.exports = mongoose.model('Restaurant',Restaurant);