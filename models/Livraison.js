const mongoose = require('mongoose');

const Livraison = mongoose.Schema({
	commande : {},
	livreur : {},
	date : {
		type : Date,
		default : Date.now
	},
	status : {
		type : String ,
		default : "en attente"
	}
}) 

module.exports = mongoose.model('Livraison',Livraison);