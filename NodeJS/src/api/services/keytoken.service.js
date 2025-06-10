'use strict'

const KeyTokenModel = require("../models/keytoken.model")

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
            return token ? token.publicKey : null 
        } catch (error) {
            return error
        }
    }
}

module.exports = KeyTokenService