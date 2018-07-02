const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/contact`;


	let baseUrl1 = `${appConfig.apiVersion}/message`;

    app.post(`${baseUrl}/create`, userController.addContacts);
   
	

    
    app.get(`${baseUrl}/listAll`,  userController.getAllContacts);
    
    app.get(`${baseUrl}/single/:contactId`,  userController.getSingleContactDetails);
    app.post(`${baseUrl}/remove`,  userController.removeAllcontacts);


  
	
	app.post(`${baseUrl1}/save`, userController.savemessagedata);
    app.get(`${baseUrl1}/getMessage`, userController.getAllMessageSent);
    app.post(`${baseUrl1}/remove`, userController.removeAll);
     
    
}