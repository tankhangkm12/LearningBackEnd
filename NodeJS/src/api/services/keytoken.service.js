'use strict'

const keyTokenModel = require("../models/keyToken.model")

/* 
    Note:
        + public key was born by asymetrical algorithm => type : hex => convert to string to save to database
*/


class KeyTokenService{

    static async createKeyToken({userId,publicKey}){
        try {
            const publicKeyString = publicKey.toString()
            const token = await keyTokenModel.create({
                user : userId,
                publicKey : publicKeyString 
            })
            return token ? publicKeyString : null 
        } catch (error) {
            return error
        }
    }
}

module.exports = KeyTokenService