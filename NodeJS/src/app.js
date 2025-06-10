const express =require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const compression = require("compression")
const app = express()

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("combined"))
app.use(compression())
app.use(express.urlencoded({
    extended : true
}))


//database
require("../src/api/dbs/init.mongodb")
const checkConnect = require("../src/api/helpers/check.connect")
checkConnect.countConnect()
// checkConnect.checkOverload()


//route
app.use("/",require("./api/routes"))

//handle error

module.exports = app;