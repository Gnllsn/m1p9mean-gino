const mongoose = require('mongoose');

const Type = mongoose.Schema({
	type : String,
}) 

module.exports = mongoose.model('Type',Type);