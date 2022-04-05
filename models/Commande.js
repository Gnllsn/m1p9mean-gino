const mongoose = require('mongoose');
const Plat = require('./Plat');
const User = require('./User');

const Commande = mongoose.Schema({
	plat : Plat,
	user : User,
	quantite : {
		type : Number,
		default : 1
	},
	lieu_livraison : String,
	date_heure_livraison : String 
}) 

module.exports = mongoose.model('Commande',Commande)
