const mongoose = require('mongoose');

const Role = mongoose.Schema({
	nom : String
})

module.exports = mongoose.model('Role',Role) 