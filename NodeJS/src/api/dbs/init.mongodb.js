const mongoose = require("mongoose")
const config = require("../../configs/config.mongodb")
const connecString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`

console.log(connecString)

class Database{
    constructor(){
        this.connect()
    }

    connect(type = "mongodb"){
        mongoose.connect(connecString,{
            maxPoolSize : 50
        }).then(_=>console.log(`Connect database [ ${connecString} ] successfully !!!`))
        .catch(err => console.log("Connect failed !! Error : ",err))
    }

    static getInstance(){
        if (!Database.instance) Database.instance = new Database();
        return Database.instance
    }

}

const instanceMongoDb = Database.getInstance()

module.exports = instanceMongoDb;