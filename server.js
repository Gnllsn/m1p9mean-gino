require('dotenv/config');
const server = require('express')();
const http = require('http') ;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routerCommandes = require('./routes/commande');
const routerLivreurs = require('./routes/livreur');
const routerRestaurants = require('./routes/restaurant');
const routerUser = require('./routes/user');

server.use(bodyParser.json())
server.use('/commande',routerCommandes);   
server.use('/livreur',routerLivreurs);   
server.use('/restaurant',routerRestaurants);   
server.use('/user',routerUser);   

function root(request,response){
	response.send("We are on home");
}


server.get('/',root);

mongoose.connect(
	process.env.BD_CONNECTION, 
	()=>{
	console.log("connect to db!")
})

server.listen(3000)