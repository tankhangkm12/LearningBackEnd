const express = require("express")
const { apiKey, checkPermission } = require("../auth/checkAuth")
const route =express.Router()

//check  API key

route.use(apiKey) // must pass api key, then next to other api under

// check permission and divide request/minute for each API key (to sell for bussiness)
route.use(checkPermission("1111"))

route.use("/v1/api",require("./access"))

module.exports = route