const Joi = require('@hapi/joi'); 

// REGISTER VALIDATION
const registerValidation = (data) =>{
	const validUser = Joi.object({
		nom : Joi.string() .min(6) .required(),
		email : Joi.string().min(6).email().required(), 
		password : Joi.string().min(8).required(), 
		role : Joi.object({
			nom : Joi.string().min(2).required()
		}).required() 
	});
	return validUser.validate(data)
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