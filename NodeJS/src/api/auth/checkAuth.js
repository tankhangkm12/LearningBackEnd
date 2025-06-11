'use strict'

const ApiKeyServices= require("../services/apiKey.service")

const HEADER = {
    API_KEY : 'x-api-key',
    AUTHORIZATION : 'authorization'
}

const apiKey = async (req,res,next) => {
    try {
        const key =req.headers[HEADER.API_KEY]?.toString()
        if (!key) return res.status(403).json({
            message : "Forbiddden Error !!!"
        })

        //check objKey
        console.log(key)
        const objKey = await ApiKeyServices.findById(key);
        if (!objKey) return res.status(403).json({
            message : "Forbiddden Error !!!"
        })
        req.objKey = objKey;
        return next()
    } catch (error) {
        
    }
}

const checkPermission = ( permission ) =>{
    return (req,res,next) => {
        if (!req.objKey.permissions) return res.status(403).json({
            message : "Permission denied !!!"
        })
        console.log(req.objKey.permissions)
        return req.objKey.permissions.includes(permission) ? next() : res.status(403).json({
            message : "Permission denied !!!"
        })
    } 
} 

module.exports = {apiKey,checkPermission};