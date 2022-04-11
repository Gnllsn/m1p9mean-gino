const routerCommande = require('express').Router() ; 

function getCommandes(request,response){
	response.send('get commandes')
}

routerCommande.get('/',getCommandes);

module.exports = routerCommande