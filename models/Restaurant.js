const mongoose = require('mongoose');

const Restaurant = mongoose.Schema({
	nom : String ,
	lieu : String
});

module.exports = mongoose.model('Restaurant',Restaurant);