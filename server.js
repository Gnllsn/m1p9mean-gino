require('dotenv/config');
const server = require('express')();
const http = require('http') ;   
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const cors = require('cors');

const routerCommandes = require('./routes/commande');
const routerLivreurs = require('./routes/livreur');
const routerRestaurants = require('./routes/restaurant');
const routerAuthentification = require('./routes/authentification');
const routerRole = require('./routes/role');
const routerType = require('./routes/types');
const routerUser = require('./routes/user');


function init_server(){
	server.use(cors())
	server.use(bodyParser.json())
	server.use('/commande',routerCommandes);   
	server.use('/livreur',routerLivreurs);   
	server.use('/restaurant',routerRestaurants);   
	server.use('/auth',routerAuthentification);   
	server.use('/role',routerRole);   
	server.use('/type',routerType);   
	server.use('/user',routerUser);   


	server.get('/',root);
	server.listen(3000)
}

function root(request,response){
	response.send("We are on home");
}


function start(){
	mongoose.connect(
		process.env.BD_CONNECTION, 
		()=>{
			console.log("Server start!")
			init_server();
		}
	)	
}

module.exports.start = start ;