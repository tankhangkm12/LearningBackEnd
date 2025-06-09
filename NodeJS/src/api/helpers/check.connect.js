const mongoose = require("mongoose")
const os = require("os")
const process = require("process")
const _SECONDS = 5000
// check count connect
const countConnect = () => {
    const numConnection = mongoose.connections.length
    console.log("Number of connections :: ",numConnection)
}


//check overload connect
const checkOverload = () =>{
    // monitor every 5 seconds
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage =process.memoryUsage().rss
        console.log(`Memory usage : ${memoryUsage /1024 /1024 } MB`)
        //example maximun number connection based on number of core
        const maxConnections = numCores * 5 ;

        if (numConnection > maxConnections) console.log(`Connection overload detected !!!`)
    },_SECONDS) //principle : all parameter must declaire const , not directly passing to function
}
module.exports = {countConnect,checkOverload}