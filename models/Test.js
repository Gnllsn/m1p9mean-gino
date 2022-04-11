const mongoose = require('mongoose');

const Test = mongoose.Schema({
	nom : String,
	daty: {
		type : Date,
		default : Date.now
	} 
}) 

module.exports = mongoose.model('Test',Test)
