const mongoose = require('mongoose');

const Livraison = mongoose.Schema({
	commande : {},
	livreur : {},
	date : {
		type : Date,
		default : Date.now
	}
}) 

module.exports = mongoose.model('Livraison',Livraison);