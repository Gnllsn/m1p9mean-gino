const mongoose = require('mongoose');
const Restaurant = require('./Restaurant');
const Type = require('./Type');

const Plat = mongoose.Schema({
	nom : String,
	restaut : {},
	type : String,
	prix : Number
}) 

module.exports = mongoose.model('Plat',Plat);