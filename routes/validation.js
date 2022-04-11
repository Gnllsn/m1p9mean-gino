const Joi = require('@hapi/joi'); 

// REGISTER VALIDATION

const registerValidationRestaut = (data) =>{
	const validUser = Joi.object({
		nom : Joi.string() .required(),
		email : Joi.string().required(), 
		password : Joi.string().required(), 
		restaut : Joi.string().required(), 
		local : Joi.string().required()
	});
	return validUser.validate(data)
}

const registerValidationUser = (data) =>{
	const validUser = Joi.object({
		nom : Joi.string() .required(),
		email : Joi.string().required(), 
		password : Joi.string().required() 
	});
	return validUser.validate(data)
}

const registerValidation = (data) =>{
	if(data.role.nom === 'restaurant'){
		delete data.role; 
		return registerValidationRestaut(data);
	}else{
		delete data.role; 
		delete data.restaut; 
		delete data.local; 
		return registerValidationUser(data);
	}
}


// LOGIN VALIDATION
const loginValidation = (data) =>{
	const validUser = Joi.object({
		email : Joi.string().email().required(), 
		password : Joi.string().min(1).required(), 
	});
	return validUser.validate(data)
}

module.exports.registerValidation = registerValidation ;
module.exports.loginValidation = loginValidation ;