const mongoose = require('mongoose');
const Plat = require('./Plat');
const User = require('./User');

const Commande = mongoose.Schema({
	client : String,
	plat : {},
	quantite : {
		type : Number,
		default : 1
	},
	lieu : String,
}) 

module.exports = mongoose.model('Commande',Commande)
