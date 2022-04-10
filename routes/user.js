const routerUser = require('express').Router() ; 
const User = require('../models/User');
const Plat = require('../models/Plat');

async function getPlats(request,response){
	const plats = await Plat.find({});
	response.send({
		status : 200,
		data : plats
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

routerUser.get('/',getPlats);

module.exports = routerUser 