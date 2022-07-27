const verify = require('../tools/verify')
const controllers = require('./auth.controllers')
const hash = require('../tools/crypto')
const jwt = require('jsonwebtoken')
const config = require('../config')
const transporter = require('../tools/email')

const registerUser = async (req, res) =>{
    const auth = verify.registerSchema.validate(req.body)
    if(auth.error){
        return res.status(400).json(auth.error)
    }
    const newUser = {
        ...req.body,
        password: hash.hashPassword(req.body.password)
    }
    const user = await controllers.createUser(newUser)
    if(!user){
        return res.status(400).json({message: "Interanl Error"})
    }
    res.status(200).json(user)
}
const loginUser = async (req, res) =>{
    const auth = verify.loginSchema.validate(req.body)
    if(auth.error){
        return res.status(400).json(auth.error)
    }
    const user = await controllers.getUserByEmail(req.body.email)
    if(!user){
        return res.status(400).json({Message: "invalid credentials"})
    }

    const veryfication = hash.comparePassword(req.body.password, user.password)
    if(!veryfication){
        return res.status(400).json({Message: "invalid credentials"})
    }
    const token = jwt.sign({
        id: user.user_id,
        email: req.body.email
    }, config.development.jwtSecret)
    res.status(200).json({token})
}


module.exports ={
    registerUser,
    loginUser
}