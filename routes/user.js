const routerUser = require('express').Router() ; 
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const Plat = require('../models/Plat');
const Commande = require('../models/Commande');
const Livraison = require('../models/Livraison');

async function getPlats(request,response){
	const plats = await Plat.find({});
	response.send({
		status : 200,
		data : plats
	})
}


async function ajoutCommande(request,response){
	const client = JWT.decode(request.headers.authorization)._id+"" ; 
	const commande = new Commande({
		client : client,
		plat : request.body.plat,
		quantite : request.body.quantite,
		lieu : request.body.lieu

	})
	const save = await commande.save();
	response.send({
		status : 200
	})
}

async function getCommandes(request,response){
	const client = JWT.decode(request.headers.authorization)._id+"" ; 
	const commandes  = await Commande.find({
		client : client
	})
	response.send({
		status : 200,
		data: commandes
	})
}

async function livrer(request,response){
	const commande = request.body ;

	let update = await Commande.updateOne({
		_id : commande._id
	},{
		status : "Livrer et payer"
	})

	update = await Livraison.updateOne({
		'commande._id' : commande._id
	},{
		status : "Livrer et payer"
	})
	response.send({
		status : 200 
	})
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

routerUser.get('/',verify_token,getPlats);
routerUser.get('/commande',verify_token,getCommandes);

routerUser.post('/commande',verify_token,ajoutCommande);
routerUser.post('/livrer',verify_token,livrer);

module.exports = routerUser 