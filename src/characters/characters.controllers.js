const characters = require('../database/models/init-models').initModels().characters
const groupMovies = require('../database/models/init-models').initModels().group_movies
const peliSeries = require('../database/models/init-models').initModels().peliculas_series

const createCharacter = async (body) =>{
    const newCharacter = await characters.create({
        ...body
    })
    return newCharacter
}
const getAll = async () =>{
    const allCharacters = await characters.findAll({
        attributes : {
            exclude: ["character_id","age","weight","history"]
        }
    })
    return allCharacters
}
const deleteCharacterDataBase = async (name) =>{
    const result = await characters.destroy({
        where:{
            name
        }
    })
    return result
}

const updateTheCharacter = async (body, name) =>{
    const update = await characters.update(body,{
        where: {
            name
        }
    })
    return update
}

const getDetails = async (name) =>{
    const details = await characters.findOne({
        where:{
            name
        },
        attributes:{
            exclude:['character_id']
        },
        include: [{
                model: groupMovies,
                as: "group_movies",
                attributes:{
                    exclude:["group_id","character_rel"]
                },
                include: [{
                    model: peliSeries,
                    as: "peli_rel_peliculas_sery",
                    attributes: {
                        exclude: ["pelis_id"]
                    }
                }]
            }]
    })
    return details
}



const getCharacterByFillterName = async (data) =>{
    const charactersFil = await characters.findAll({
        where:{
            name: data
        }
    })
    return charactersFil
}
const getCharacterByFillterAge = async (data) =>{
    const charactersFil = await characters.findAll({
        where:{
            age: data
        }
    })
    return charactersFil
}

const getCharacterByFillterIdMovie = async (data) =>{
    const charactersFil = await peliSeries.findOne({
        where: {
            pelis_id: data
        },
        attributes: {
            exclude:["title","created","calification","image"]
        },
        include:{
            model: groupMovies,
            as: "group_movies",
            attributes:{
                exclude:["group_id","character_rel"]
            },
            include:[{
                model: characters,
                as: "character_rel_character"
            }]
        }
    })
    return charactersFil["group_movies"]
}
module.exports = {
    createCharacter,
    getAll,
    deleteCharacterDataBase,
    updateTheCharacter,
    getDetails,
    getCharacterByFillterName,
    getCharacterByFillterAge,
    getCharacterByFillterIdMovie
}