const routerRestaurant = require('express').Router() ; 

function getRestaurant(request,response){
	response.send('get restaurant')
}

routerRestaurant.get('/',getRestaurant);

module.exports = routerRestaurant