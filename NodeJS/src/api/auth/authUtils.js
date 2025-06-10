'use strict'
const JWT = require("jsonwebtoken")

/*
    Note:
        + private key doesn't save to database, we will use a time to sign token when signIn/login success
*/

const createTokenPair = async (payload,publicKey,privateKey) => {
    try {
       //access token
        const accessToken =  JWT.sign(payload,privateKey,{
            algorithm : 'RS256', //default HS256
            expiresIn : '15m'
        })

       //refresh token
        const refreshToken = JWT.sign(payload,privateKey,{
            algorithm : 'RS256', //default HS256
            expiresIn : '7d'
        })

        
        JWT.verify(accessToken,publicKey,(error,decode)=>{
            if (error) return {
                code : "xxx",
                message : "verify failed !!!"
            }
            console.log("decode : ",decode)
        })

        return {accessToken,refreshToken}


    } catch (error) {
        return error
    }
}

module.exports = createTokenPair