'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'
// Declare the Schema of the Mongo model
var keyTokenSchema = new mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.ObjectId, // value is type id of Shop 
        required:true,
        ref : "Shop"
    },
    publicKey:{
        type:String,
        required:true
    },
    refreshToken:{ //detect hacker use token unauthorized to process
        type:Array,
        default : []
    }
},{
    collection : COLLECTION_NAME,
    timestamps : true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME,keyTokenSchema);