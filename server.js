require('dotenv/config');
const server = require('express')();
const http = require('http') ;   
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const io = require('socket.io');

const routerCommandes = require('./routes/commande');
const routerLivreurs = require('./routes/livreur');
const routerRestaurants = require('./routes/restaurant');
const routerAuthentification = require('./routes/authentification');
const routerRole = require('./routes/role');
const routerType = require('./routes/types');
const routerUser = require('./routes/user');
const routerAdmin = require('./routes/admin');

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
	server.use('/admin',routerAdmin);   

	server.get('/',root);
	server.listen(3000)
}

async function root(request,response){
	response.send("Welcom server node")
}


function start(){
	mongoose.connect(
		process.env.BD_CONNECTION, 
		(socket)=>{
			console.log("Server start! " +socket)
			init_server();
		}
	)	
}

module.exports.start = start ;