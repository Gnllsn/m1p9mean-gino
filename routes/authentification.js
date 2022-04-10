const { registerValidation,loginValidation } = require('./validation');
const Joi = require('@hapi/joi'); 
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const router = require('express').Router(); 
const bcrypt = require('bcryptjs')
const Restaurant = require('../models/Restaurant');
const Livreur = require('../models/Livreur');
const Admin = require('../models/Admin');

async function register(request,response){

	const role = request.body.role;

	// validation user 
	const { error } = registerValidation(request.body);
	if(error)return response.status(200).send({
		status : 400 ,
		message : error.details[0].message
	});

	// exist mail
	const emailExist = await findUser({email:request.body.email})
	if(emailExist) return response.status(200).send({
		status : 400 ,
		message : "Email déjà existant"
	});

	// hash password
	const salt = await bcrypt.genSalt(10); 
	request.body.password = await bcrypt.hash(request.body.password,salt);

	//  create new user 
	try{	
		let saveduser = null ;
		if(role.nom === 'client' ){
			saveduser = await new User(request.body).save();
		}else if(role.nom === 'restaurant'){
			saveduser = await new Restaurant(request.body).save();
		}else if(role.nom === 'livreur'){
			saveduser = await new Livreur(request.body).save();
		}
		const token = JWT.sign({_id : saveduser._id},process.env.TOKEN_SECRET)
		saveduser.password = undefined;
		delete saveduser.password ;
		response.send({
			status : 200 ,
			data : {
				user : {
					user : saveduser,
					role : role
				},
				token : token
			}
		})
	}catch(err){
		response.status(400).send(err)
	} 
}

async function login(request,response){

	// validation user 
	const { error } = loginValidation(request.body);
	if(error)return response.status(200).send({
		status : 400 ,
		message : error.details[0].message
	});

	// get user  
	const user = await findUser({email:request.body.email})
	if(!user) return response.status(200).send({
		status : 400,
		message : 'Email introuvable'
	});

	// check password
	const validPassword = await bcrypt.compare(request.body.password,user.user.password)
	if(!validPassword) return response.status(200).send({
		status : 400,
		message : 'Mot de passe incorrect'
	});

	// create token 
	const token =  JWT.sign({_id : user.user._id},process.env.TOKEN_SECRET)
	console.log(token)
	user.password = undefined ; 
	response.send({
		status : 200,
		data : {
			user : user,
			token : token
		}
	});
}

function verify_TOKEN(request,response,next){

	// check token 
	const token = request.header('auth-token');
	if(!token) return response.status(400).send('Acces denied');

	// verify token secret
	try{
		request.user = JWT.verify(token,process.env.TOKEN_SECRET);
		next();
	}catch(err){
		response.status(400).send("Token invalid");
	}
}

async function findUser(data){
	let user = await User.findOne({email:data.email});
	if(!user){
		user = await Restaurant.findOne({email:data.email});
		if(!user) {
			user = await Livreur.findOne({email:data.email});
			if(!user){
				user = await Admin.findOne({email:data.email});
				if(!user)return null ;
				else {
					return {
						user : user,
						role : {
							nom : 'Admin'
						}
					}
				}
			}else{
				return {
					user : user,
					role : {
						nom : 'livreur'
					}
				}	
			}
		}else{
			return {
				user : user,
				role : {
					nom : 'restaurant'
				}
			} 	
		}
	} else {
		return {
			user : user,
			role : {
				nom : 'client'
			}
		} ;
	}
}

router.post('/register',register);
router.post('/login',login);

module.exports = router ;