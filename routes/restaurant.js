const routerRestaurant = require('express').Router() ; 
const Plat = require('../models/Plat');
const JWT = require('jsonwebtoken');
const ObjectId =  require('mongoose').Types.ObjectId;

function getRestaurant(request,response){
	response.send('get restaurant')
}

async function Ajout_Plat(request,response){
	let plat = new Plat(request.body); 

	// check nom exit
	const plat_exit = await Plat.findOne({
		nom : plat.nom,
		type : plat.type,
		restaut : plat.restaut 
	})
	if(plat_exit) return response.send({
		status : 400 ,
		message : "Plat déjà existant"
	});

	// insert plat 
	plat = await plat.save();
	return response.send({
		status : 200
	});

}

async function getMesPlats(request,response){
	const _id = "6251cb30bfa30cbda4415000" ; 
	const mes_plats = await Plat.find({
		restaut : _id
	})
	return response.send({
		status : 200,
		data : mes_plats
	})
}

async function getPlats(request,response){
	let _id = request.params.id;
	if(!_id){
		return response.send({
			status : 200,
			message : "Identifiant plat invalide" 
		})
	} 

	// cast string to objectid
	try{
		_id = ObjectId(_id);
	}catch(err){
		return response.send({
			status : 200,
			message : "Identifiant plat incorrect"
		})
	}

	// get plat
	const plat = await Plat.findById(_id);
	if(!plat) {
		return response.send({
			status : 200,
			message : "Plat introuvable"
		})
	} 
	return response.send({
		status : 200,
		data : plat
	})
}

async function modifierPlat(request,response){
	let _id = request.params.id;
	if(!_id){
		return response.send({
			status : 200,
			message : "Identifiant plat invalide" 
		})
	} 

	// cast string to objectid
	try{
		_id = ObjectId(_id);
	}catch(err){
		return response.send({
			status : 200,
			message : "Identifiant plat incorrect"
		})
	}

	// get plat
	const plat = await Plat.updateOne({
		_id : _id	
	},{
		nom : request.body.nom,
		prix : request.body.prix,
		type : request.body.type
	});
	return response.send({
		status : 200,
	})
} 

async function supprimerPlat(request,response){
	let _id = request.params.id;
	if(!_id){
		return response.send({
			status : 200,
			message : "Identifiant plat invalide" 
		})
	} 

	// cast string to objectid
	try{
		_id = ObjectId(_id);
	}catch(err){
		return response.send({
			status : 200,
			message : "Identifiant plat incorrect"
		})
	}

	// delete plat
	const plat = await Plat.deleteOne({_id : _id});
	return response.send({
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

routerRestaurant.get('/',getRestaurant);
routerRestaurant.get('/mes-plats',verify_token,getMesPlats);
routerRestaurant.get('/plat/:id',verify_token,getPlats);

routerRestaurant.post('/ajout-plat',verify_token,Ajout_Plat);

routerRestaurant.put('/plat/:id',verify_token,modifierPlat);

routerRestaurant.delete('/plat/:id',supprimerPlat);


module.exports = routerRestaurant