const express = require('express');
const path = require('path');

const app = express() ;

app.use(express.static('./dist/m1p9mean-gino'))

app.get('/*',(request,response)=>{
	response.sendFile('indexe.html' , {root : 'dist/m1p9mean-gino/' })
})

app.listen(process.env.PORT || 8080);