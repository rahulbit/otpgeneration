const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let  messageSchema = new Schema(
  {

    messageId:{
        type:String,
        unique: true
    },

    contact: {
         type: Number,
          default:''
      },

      
   message:{
    type:String,
    default:''
   },

messagesenttime:{
    type:Date,
    default:Date.now
},

otp:{
    type:String,
    default:''
},
name:{
    type:String,
    default:''
},

  }
)

mongoose.model('Message' ,messageSchema)

