const mongoose = require('mongoose');

const Commande = mongoose.Schema({
	client : String,
	plat : {},
	quantite : {
		type : Number,
		default : 1
	},
	lieu : String,
	status : {
		type : String,
		default : "en cours de preparation"
	}
}) 

module.exports = mongoose.model('Commande',Commande)
