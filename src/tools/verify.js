const joi = require('joi')
const registerSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(8).max(45),
    name: joi.string().required().min(3)
})
const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(8).max(45)
})

const charactersSchema = joi.object({
    name: joi.string().required(),
    age: joi.number().required(),
    history: joi.string().min(5).max(255),
    weight: joi.number().required()
})

const movieSchema = joi.object({
    title: joi.string().required(),
    calification: joi.number().required(),
    created: joi.string()
})

module.exports = {
    registerSchema,
    loginSchema,
    charactersSchema,
    movieSchema
}
 