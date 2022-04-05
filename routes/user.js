const routerUser = require('express').Router() ; 
const User = require('../models/User');

function getUser(request,response){
	response.send('get user')
}

function postUser(request,response){
	// const header = request.headers ;
	// response.send(header.authorization==null)
	const user = new User(request.body);
	response.send(user);
}


routerUser.get('/',getUser);
routerUser.post('/',postUser);

module.exports = routerUser