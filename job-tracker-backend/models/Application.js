const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },

    company:{
        type:String,
        required:true
    },

    role:{
        type:String,
        required:true
    },

    status:{
        type:String,
        enum:['Applied','Interview','Offer','Rejected'],
        default:'Applied'
    },

},{timestamps:true},)
 


const Applcation= new mongoose.model('Application',applicationSchema);

module.exports=Applcation;