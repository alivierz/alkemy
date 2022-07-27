const movies = require('../database/models/init-models').initModels().peliculas_series
const characters = require('../database/models/init-models').initModels().characters
const group = require('../database/models/init-models').initModels().group_movies
const groupGenders = require('../database/models/init-models').initModels().group_genders
const genders = require('../database/models/init-models').initModels().genders

const getAllRepertory = async () =>{
    const all = await movies.findAll({
        attributes:{
            exclude:["pelis_id", "calification"]
        }
    })
    return all
}

const getPeliDetails = async (name) =>{
    const movie = await movies.findOne({
        where: {
            title: name.split("_").join(" ")
        },
        attributes: {
            exclude: ["pelis_id"]
        },
        include:{
            model: group,
            as: "group_movies",
            include:{
                model: characters,
                as: "character_rel_character",
                attributes:{
                    exclude:["character_id","age","history","weight"]
                }
            }, 
            attributes:{
                exclude: ["character_rel", "group_id"]
            }
        }
    })
    return movie
}

const createMovie = async (body) =>{
    const newMovie = await movies.create({
        ...body
    })
    return newMovie
}
const updateMovie = async (body) =>{
    const update = await movies.update(body,{
        where: {
            title: body.title
        }
    })
    return update
}

const destroyMovie = async (title) =>{
    const destroy = await movies.destroy({
        where:{
            title
        }
    })
    return destroy
}

const getMoviesByName = async (data) =>{
    const result = await movies.findAll({
        where:{
            title: data.split("_").join(" ")
        }
    })
    return result
}
const getMoviesByGenre = async (name) =>{
    const response = await genders.findOne({
        where:{
            name
        },
        include:{
            model: groupGenders,
            as: "group_genders",
            include:{
                model: movies,
                as:"peli_rel_peliculas_sery"
            }
        }
    })
    return response
}
const getMoviesByPublication = async (order) =>{
    const response = await movies.findAll({})
    if(order == "ASC"){
        response.sort(function(a, b) {
        if (a.created < b.created) {
            return -1;
          }
        });
    }
    if(order == "DESC"){
        response.sort(function(a, b) {
            if (a.created > b.created) {
                return 1;
              }
            });
    }
    

    return response
}
module.exports ={
    getAllRepertory,
    getPeliDetails,
    createMovie,
    updateMovie,
    destroyMovie,
    getMoviesByName,
    getMoviesByGenre,
    getMoviesByPublication
}