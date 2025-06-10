const ShopModel = require("../models/shop.model")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const KeyTokenService = require("./keytoken.service")
const createTokenPair = require("../auth/authUtils")


const RoleShop = {
    SHOP : 'SHOP', //shold write by code , such as 0001 => to hard to guess
    WRITER : 'WRITER',
    READER : 'READER',
    ADMIN : 'ADMIN'
}


class AccessServices{
    static async signUp({username,password,email}){
        try{
            // step 1 : check mail exists ??
            const emailExisting = await ShopModel.findOne({email}).lean() //lean() help return object js (if no have lean, it wil return mongoose model, size more 30 time than have lean() )
            if (emailExisting) return {
                code : "xxx",
                message : "Shop already registered!"
            }
            const hashPasword = await bcrypt.hash(password,10)
            const newShop = await ShopModel.create({  //create mode , save to document and return model if success
                username,
                password : hashPasword,
                email,roles : [RoleShop.SHOP]
            })

            if (newShop){
                const {privateKey,publicKey} = crypto.generateKeyPairSync('rsa',{
                    modulusLength : 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1', //pkcs1 : public key cryptoGraphy Standards ! => standard to encode and decode "rsa" algorithm
                        format: 'pem' // pem : format to binary encoding
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1', //pkcs8
                        format: 'pem'
                    },
                })
                console.log({publicKey,privateKey})
                const publicKeyString = KeyTokenService.createKeyToken({
                    userID : newShop.id,
                    publicKey
                }) // get from database => its type string => needed convert to rsa
                if (!publicKeyString){
                    return {
                        code : "xxxx",
                        message : "PublicKeyString error!"
                    }
                }
                //convert publicKey string to rsa
                const publicKeyObject = crypto.createPublicKey(publicKeyString)

                console.log(`Public Key Object ::: ${publicKeyObject}`)
                //create token pair<accessToken,refreshToken>
                const tokens = createTokenPair({userId : newShop._id,email},publicKeyObject,privateKey)
                console.log("Created token success ::: ",tokens)

                return {
                    code : 201,
                    metadata : {
                        shop : newShop,
                        tokens
                    }
                }
            }
            return {
                code : 200,
                metadata : null
            }
        }catch(error){
            return {
                code : "xxx",
                message : error.message,
                status : "error"
            }
        }
    }
}

module.exports = AccessServices