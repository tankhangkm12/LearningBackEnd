const lodash = require('lodash')

const getInfoData = ({fields =[] , object = {}}) =>{
    return lodash.pick(object,fields) // get all fields of object
}

module.exports =  getInfoData