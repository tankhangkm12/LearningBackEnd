require("dotenv").config()


// development
const dev = {
    app : {
        PORT : process.env.DEV_APP_PORT || 2512
    },
    db : {
        host : process.env.DEV_DB_HOST || 'localhost',
        port : process.env.DEV_DB_PORT || 27017,
        name : process.env.DEV_DB_NAME || "shopDEV"
    }
}


//production
const pro = {
    app : {
        PORT : process.env.PRO_APP_PORT || 3000
    },
    db : {
        host : process.env.PRO_DB_HOST || 'localhost',
        port : process.env.PRO_DB_PORT || 27017,
        name : process.env.PRO_DB_NAME || "shopPRO"
    }
}

const config = {dev,pro}

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]
