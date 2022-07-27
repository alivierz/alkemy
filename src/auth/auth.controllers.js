const users = require('../database/models/init-models').initModels().users
const uuid = require('uuid')


const createUser = async (body) =>{
    const newUser = await users.create({
        user_id: uuid.v4(),
        ...body
    })
    return newUser
}
const getUserByEmail = async (email) =>{
    const user = await users.findOne({
        where:{
            email
        }
    })
    return user
}
module.exports ={
    createUser,
    getUserByEmail
}