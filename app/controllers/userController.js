const mongoose = require('mongoose');
const time = require('./../libs/timeLib');
const shortId = require('shortid')
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('../libs/checkLib')
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
    apiKey: 'e93b7409',
    apiSecret: 'PEGEibiXR3vrpiQG'
  });





/* Models */
const contactModel = mongoose.model('Contact');
const messageModel = mongoose.model('Message');

let addContacts =(req, res)=>{
    if(check.isEmpty(req.body.firstName)|| check.isEmpty(req.body.lastName) || check.isEmpty(req.body.contact) )
    {
        let  apiresponse = response.generate('true', 'required parameters are missing', 403,null)
        res.send(apiresponse)
    }
    else{

        let newContact = new  contactModel({
           
           contactId:shortId.generate(),
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            contact:req.body.contact,
         

        })
       

        newContact.save((err, result)=>{
           if(err)
           {
               console.log('error occured')
               logger.error(`error occured ${err}` ,'database', 10);
               let apiresponse = response.generate('true', 'error occured', 500, null )
               res.send(apiresponse)
               
           }
           res.send(result)
           console.log('Contact added to list succesfull')


        })

    }
}



let getAllContacts =(req, res)=>{
    contactModel.find()
    .select('-__v -__id')
    .lean()
    .exec((err, result)=>{
        if(err)
        {
          logger.error(`error occured ${err}`, 'database', 10);
          let apiresponse = response.generate('true', 'error occured', 403,null )

          res.send(apiresponse)   
        }
        else if(check.isEmpty(result)){
             let apiresponse = response.generate('true', ' no contact in the list', 404, null)
             res.send(apiresponse)

        }
        else{
            
            let apiresponse = response.generate('false','  contacts found ', 200, result );
            res.send(apiresponse)
        }
    })
}


let savemessagedata =(req, res)=>{


    if(check.isEmpty(req.body.name)|| check.isEmpty(req.body.otp)||check.isEmpty(req.body.contact)|| check.isEmpty(req.body.message))
    {
        let  apiresponse = response.generate('true', 'required parameters are missing', 403,null)
        res.send(apiresponse)
    }

      else {


        let newMessage = new  messageModel({
            messageId :shortId.generate(),
            name: req.body.name,
            otp:req.body.otp,
            message:req.body.message,
            contact:req.body.contact
           
    
        })
               console.log(newMessage)

               newMessage.save((err, result)=>{
        
                if(err){
                    console.log('error occured')
                    logger.error(`error occured ${err}`, database, 10)
                    let apiresponse = response.generate('true', 'error occured', 500,null )
                    console.log(apiresponse)
        
        
                }
        
                else {
                    res.send(result)
                    console.log('Message added succesfully')
                }
            })
      

           const otp= req.body.otp;
     
           const number = req.body.contact;
           const message = req.body.message;
        // console.log(number )
      // console.log(message)
 
     nexmo.message.sendSms(
        "NEXMO",number , `${message+ ' ' +otp}`, {type: 'unicode'},
        (err, responseData) => {
            if (responseData) {
                console.log(responseData)
            }

            else {
                console.log('some error occured')
            }
        }
      );


      

  
}
}

let getAllMessageSent =(req, res)=>{
    messageModel.find()
    .select('-__v -__Id')
    .lean()
    .exec((err, result)=>{
        if(err)
        {
            console.log('some error occured')
            logger.error(`error occured ${err}`, database, 10)
            let apiresponse = response.generate('true', 'error occured ', 500,null )
            res.send(apiresponse)
        }
        else 
        {
             let apiresponse = response.generate('true', 'message found', 200, result)
             res.send(apiresponse)
        }
    })
}

let getSingleContactDetails =(req, res)=>{
    if(check.isEmpty(req.params.contactId))
    {
        let apiresponse = response.generate('true', 'required parameter missing', 403, null)
        res.send(apiresponse)
    }
    else{

    
      contactModel.findOne({'contactId':req.params.contactId}, (err, result)=>{
          if(err)
          {
            logger.error(`error occured ${err}`, 'database', 10 )
                    let apiresponse = response.generate('true', 'error occured', 500,null )
                    res.send(apiresponse)  
          }
          else if(check.isEmpty(result))
          {
            let apiresponse = response.generate('true', ' contact   not found', 404, null)
            res.send(apiresponse)
          }
          else{
            let apiresponse = response.generate('false', ' contact  found', 200, result)
            res.send(apiresponse)
        }
          })
        }
    
}


let removeAll =(req,res)=>{
    messageModel.remove((err, result)=>{
        if(err)
        {
            console.log('some error occured')
            logger.error(` error ocured ${err}`, database , 10)

        }
        else{
            res.send(result)
            console.log('data removed succesfully')
        }
    })
}

let removeAllcontacts =(req,res)=>{
    contactModel.remove((err, result)=>{
        if(err)
        {
            console.log('some error occured')
            logger.error(` error ocured ${err}`, database , 10)

        }
        else{
            res.send(result)
            console.log('data removed succesfully')
        }
    })
}





module.exports = {
addContacts:addContacts,
getAllContacts: getAllContacts,
   getAllMessageSent:getAllMessageSent,
   savemessagedata:savemessagedata,
   removeAll:removeAll,
   getSingleContactDetails,
   removeAllcontacts:removeAllcontacts

}// end exports