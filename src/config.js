require('dotenv').config()

module.exports = {
    development:{
        port: process.env.PORT,
        nodeEnv: process.env.NODE_ENV || 'development',
        jwtSecret: process.env.JWTSECRET || "academlo",
        databaseName: process.env.database,
        user: process.env.username,
        password: process.env.password
    }
}