const routerLivreur = require('express').Router() ; 

function getLivreur(request,response){
	response.send('get livreur')
}

routerLivreur.get('/',getLivreur);

module.exports = routerLivreur