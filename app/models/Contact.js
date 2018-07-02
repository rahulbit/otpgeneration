const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let contactSchema = new Schema(
  {
    contactId:{
        type:String,
        unique:true
    },
    contact: {
      type: Number,
      default:''
    },

      firstName: {
      type: String,
      default: ''
    },

      lastName: {
      type: String,
      default: ''
    },

    



  }
)

mongoose.model('Contact' ,contactSchema)

