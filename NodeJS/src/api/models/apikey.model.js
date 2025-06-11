'use strict'


const mongoose = require('mongoose'); // Erase if already required

const COLLECTION_NAME = 'Apikey'
const DOCUMENT_NAME = 'Apikeys'

// Declare the Schema of the Mongo model
var apiKeySchema = new mongoose.Schema({
    key:{
        type:String,
        required:true,
        unique:true,
    },
    status:{
        type:mongoose.Schema.Types.Boolean,
        default : true
    },
    permissions : {
        type : [String],
        required : true,
        enum : ['0000','0001','0002']
    }
},{
    timestamps :true,
    collection : COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, apiKeySchema);