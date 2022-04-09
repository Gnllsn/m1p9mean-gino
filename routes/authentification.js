const router = require('express').Router(); 
const User = require('../models/User');
const Joi = require('@hapi/joi'); 
const bcrypt = require('bcryptjs')
const { registerValidation,loginValidation } = require('./validation');
const JWT = require('jsonwebtoken');

async function register(request,response){

	// validation user 
	const { error } = registerValidation(request.body);
	if(error)return response.status(400).send(error.details[0].message);

	// exist mail
	const emailExist = await User.findOne({email:request.body.email})
	if(emailExist) return response.status(400).send("Email already exists");

	// hash password
	const salt = await bcrypt.genSalt(10); 
	request.body.password = await bcrypt.hash(request.body.password,salt);

	//  create new user 
	const user = new User(request.body);
	try{		
		const saveduser = await user.save() ;
		saveduser.password = undefined;
		response.send(saveduser)
	}catch(err){
		response.status(400).send(err)
	} 
}

async function login(request,response){

	// validation user 
	const { error } = loginValidation(request.body);
	if(error)return response.status(400).send(error.details[0].message);

	// get user 
	const user = await User.findOne({email:request.body.email})
	if(!user) return response.status(400).send('Email not found');

	// check password
	const validPassword = await bcrypt.compare(request.body.password,user.password)
	if(!validPassword) return response.status(400).send('Password invalid');

	// create token 
	const token = JWT.sign({_id : user._id},process.env.TOKEN_SECRET)
	response.header('aut-token',token).send(token);
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

router.post('/register',register);
router.post('/login',login);

module.exports = router ;