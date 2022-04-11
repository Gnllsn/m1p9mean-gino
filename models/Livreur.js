const mongoose = require('mongoose');

const Livreur = mongoose.Schema({
	nom : String,
	email : String , 
	password : String , 
}) 

module.exports = mongoose.model('Livreur',Livreur)
