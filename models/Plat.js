const mongoose = require('mongoose');
const Restaurant = require('./Restaurant');
const Type = require('./Type');

const Plat = mongoose.Schema({
	nom : String,
	restaurant : new Restaurant().schema.obj,
	type : new Type().schema.obj,
	prix : Number,
	photo : String
}) 

module.exports = mongoose.model('Plat',Plat);