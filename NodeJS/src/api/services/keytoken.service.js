'use strict'

const KeyTokenModel = require("../models/keyToken.model")

/* 
    Note:
        + public key was born by asymetrical algorithm => type : hex => convert to string to save to database
*/


class KeyTokenService{

    static async createKeyToken({userId,publicKey}){
        try {
            const publicKeyString = publicKey.toString()
            const token = await KeyTokenModel.create({
                user : userId,
                publicKey : publicKeyString 
            })
            console.log("Typeof(token) : ",typeof(token))
            console.log("typeof(token.publicKey) : ",typeof(token.publicKey))
            return token ? token.publicKey : null 
        } catch (error) {
            console.log("ConCac")
            return error
        }
    }
}

module.exports = KeyTokenService