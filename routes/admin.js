const routerAdmin = require('express').Router() ; 
const JWT = require('jsonwebtoken');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs')
const Commande = require('../models/Commande');
const Livreur = require('../models/Livreur');
const Livraison = require('../models/Livraison');
const ObjectId =  require('mongoose').Types.ObjectId;

async function getAdmin(request,response){
	response.send("coucou")
}

async function getCommandes(request,response){
	const commandes = await Commande.find({});
	return response.send({
		status : 200 ,
		data : commandes
	})
}

async function getLivreurs(request,response){
	const livreurs = await Livreur.find({});
	return response.send({
		status : 200 ,
		data : livreurs
	})
}

async function asigner_livreur(request,response){
	// get livreur efa anaty collection livraison
	const livreurs_misy_livraison = await livreur_misy_livraison();

	// get livreur mbola tsy ao 
	let livreur_libre = await Livreur.find({
		'_id' :  { $nin: livreurs_misy_livraison } 
	})

	// raha misy 
	if(livreur_libre.length!=0){
		livreur_libre = livreur_libre[0]
	}else{
	// raha tsy misy dia jerena izay nahazo livraison taloha indrindra  
	livreur_libre = await Livraison.find({}).sort({'date' : 1}).limit(1);
	livreur_libre = livreur_libre[0].livreur ;
}

	// creer livraison
	let new_commande = new Livraison({
		commande :  request.body,
		livreur : livreur_libre
	})

	// save livraison
	new_commande = await new_commande.save();
	if(new_commande){
		let _id_commande = request.body._id ; 
		// cast string to objectid
		try{
			_id_commande = ObjectId(_id_commande);
		}catch(err){
			return response.send({
				status : 200,
				message : "Identifiant Commande incorrect"
			})
		}

		// update status commande
		new_commande = await Commande.updateOne({
			_id : _id_commande 
		},{
			status : "Assigner Livreur"
		})

		if(new_commande.modifiedCount==1 && new_commande.matchedCount==1){
			response.send({
				status : 200
			})
		}else{
			response.send({
				status : 400,
				data : {
					modifiedCount : new_commande.modifiedCount,
					matchedCount : new_commande.matchedCount
				}
			})
		}
	}else{
		return response.send({
			status : 400
		})
	}
}

function verify_token(request,response,next){
	const token = request.headers.authorization;
	if(!token) return response.send({
		status : 400 ,
		message : 'Acces denied'
	});

	// verify token secret
	try{
		JWT.verify(token,process.env.TOKEN_SECRET);
		next();
	}catch(err){
		return response.send({
			status : 400 ,
			message : "Token invalid"
		});
	}
}

async function livreur_misy_livraison(){
	let livraisons = await Livraison.find({});
	return livraisons?.map(livraison => livraison.livreur._id.toString())
}

routerAdmin.get('/',verify_token,getAdmin);
routerAdmin.get('/commandes',verify_token,getCommandes);
routerAdmin.post('/asigner',verify_token,asigner_livreur);



module.exports = routerAdmin