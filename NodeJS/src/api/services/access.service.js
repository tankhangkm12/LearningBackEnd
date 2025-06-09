const ShopModel = require("../models/shop.model")
const bcrypt = require("bcrypt")


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
            const newShop =await ShopModel({
                username,
                password : hashPasword,
                email,roles : [RoleShop.SHOP]
            })

            await newShop.save()

            return {
                code : "xyz",
                message : "shop sign up successfully!"
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