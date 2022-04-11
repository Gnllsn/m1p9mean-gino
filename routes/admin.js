const routerAdmin = require('express').Router() ; 
const JWT = require('jsonwebtoken');
const Commande = require('../models/Commande');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs')

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

routerAdmin.get('/',verify_token,getAdmin);

routerAdmin.get('/commandes',verify_token,getCommandes);

module.exports = routerAdmin