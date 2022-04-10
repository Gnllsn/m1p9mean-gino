const routerUser = require('express').Router() ; 
const User = require('../models/User');
const Plat = require('../models/Plat');
const Commande = require('../models/Commande');
const JWT = require('jsonwebtoken');

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

routerUser.post('/commande',verify_token,ajoutCommande);

module.exports = routerUser 