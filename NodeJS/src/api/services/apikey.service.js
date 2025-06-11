'use strict'
const crypto = require("crypto")
const ApiKeyModel = require("../models/apikey.model");
const findById = async (key) => {
    try {
        // console.log(crypto.randomBytes(64)) //buffer
        // console.log(crypto.randomBytes(64).toString('hex')) //convert to hex
        // const newKey = await ApiKeyModel.create({key : crypto.randomBytes(64).toString('hex'), permissions : ['0000']})
        const objKey = await ApiKeyModel.findOne({key,status:true}).lean()
        console.log(objKey) 
        return objKey || null; // Not found? Return null
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    findById
}