const routerType = require('express').Router() ; 
const Type = require('../models/Type');

async function getTypes(request,response){

	const data = await Type.find({})
	return response.send({
		status : 200,
		data : data
	});
}

routerType.get('/',getTypes);

module.exports = routerType 