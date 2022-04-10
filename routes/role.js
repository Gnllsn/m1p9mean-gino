const routerRole = require('express').Router() ; 
const Role = require('../models/Role');

async function getRoles(request,response){
	const roles = await Role.find({})
	return response.send({
		status : 200,
		data : roles
	});
}

routerRole.get('/',getRoles);

module.exports = routerRole 