const routerLivreur = require('express').Router() ; 
const JWT = require('jsonwebtoken');
const Livraison = require('../models/Livraison');
const ObjectId =  require('mongoose').Types.ObjectId;
const Commande = require('../models/Commande');
const Livreur = require('../models/Livreur');

async function getLivreur(request,response){
	const livreurs =  await Livreur.find({});
	response.send({
		status : 200 ,
		data : livreurs 
	})
}

async function mes_livraisons(request,response){
	const _id = JWT.decode(request.headers.authorization)._id+"" ; 
	const Livraisons =  await Livraison.find({
		'livreur._id' : ObjectId(_id),
		'status' : { $nin : ['Livrer et payer'] }
	});
	response.send({
		status : 200 ,
		data : Livraisons 
	})
}


async function en_livraisons(request,response){
	const livraison = request.body ;

	let update = await Livraison.updateOne({
		_id : livraison._id
	},{
		status : "en cours Livraison"
	});

	update = await Commande.updateOne({
		'_id' : livraison.commande._id 
	},{
		status : "en cours Livraison"
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
routerLivreur.get('/',verify_token,getLivreur);
routerLivreur.get('/mes-livraisons',verify_token,mes_livraisons);

routerLivreur.post('/en-livraison',verify_token,en_livraisons);

module.exports = routerLivreur