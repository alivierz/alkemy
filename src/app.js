//? Dependencies
const express = require('express')
const cors = require('cors')
//const swagger = require('swagger-ui-express')
//const swaggerJson = require('./swagger.json')
//const multer = require('multer')

//? Import files
const config = require('./config')
require('dotenv').config()

//? import routes
const usersRouter = require('./auth/auth.routes').router
const characterRouter = require('./characters/characters.routes').router
const moviesRouter = require('./movies/movies.routes').router
//? Initial configuration
const app = express()
// Enable incoming JSON data
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
//* Routes
app.use('/auth', usersRouter)
app.use('/', characterRouter)
app.use('/', moviesRouter)
app.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to my Restaurant api"})
})
/*
app.use("/docs", swagger.serve, swagger.setup(swaggerJson))
*/

app.listen(config.development.port, () => {
   //! console.log(`Server started at port ${config.port}`)
})

module.exports = {
    app
}