//Importing the required modules
const express=require('express');
const bodyParser=require('body-parser');
//Making connection to DB in atlas
const {mongoose} = require('../Configuration/db');
const lesson=require('../Crud/lessonroute');
const squad=require('../Crud/squadroute');
//Creating an express app
const app=express();
app.use(bodyParser.json());
//Making the routes
app.use('/api',lesson);
app.use('/api',squad);
//staring a server
app.listen(3000,()=>console.log("Server started at port 3000"))