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


//database
require("../src/api/dbs/init.mongodb")

//route


module.exports = app;