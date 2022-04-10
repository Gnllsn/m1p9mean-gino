const routerRestaurant = require('express').Router() ; 
const Plat = require('../models/Plat');
const JWT = require('jsonwebtoken');

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
routerRestaurant.post('/ajout-plat',verify_token,Ajout_Plat);

module.exports = routerRestaurant