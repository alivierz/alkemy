const verify = require('../tools/verify')
const controllers = require('./movies.controllers')

const getAllMovies = async (req, res) =>{
    if(req.query){
        if(req.query.name){
            const value = req.query.name
            const moviesByName = await controllers.getMoviesByName(value)
            return res.status(200).json({moviesByName})
        }else if(req.query.genre){
            const moviesByGen = await controllers.getMoviesByGenre(req.query.genre)
            return res.status(200).json({moviesByGen})
        }else if(req.query.order){
            if(req.query.order == "ASC" || req.query.order == "DESC"){
                const moviesByOr = await controllers.getMoviesByPublication(req.query.order)
                return res.status(200).json({moviesByOr})
            }
            return res.status(400).json({message: "Is not valid order used ASC o DESC"})
        }
    }
    const allMovies = await  controllers.getAllRepertory()
    if(!allMovies){
        return res.status(400).json({message: "Missing Data"})
    }
    res.status(200).json(allMovies)
}
const getMovieDetails = async (req, res) =>{
    if(!req.params.name){
        return res.status(400).json({Message: "Missing Data"})
    }
    const data = req.params.name
    const movie = await controllers.getPeliDetails(data)
    if(!movie){
        return res.status(400).json({Message: "Missing Data 2"})
    }
    res.status(200).json(movie)
}



const registerMovie = async (req, res) =>{
    if(!req.file.filename){
        return res.status(400).json({message: "Need An Image"})
    }
    const auth = verify.movieSchema.validate(req.body)
    if(auth.error){
         return res.status(400).json(auth.error)
    }
    const newMovie = {
        ...req.body,
        image: `localhost:8000/movies/${req.file.filename}`
    }
    const movie = await controllers.createMovie(newMovie)
    if(!movie){
        return res.status(400).json({message: "Internal Error"})
    }
    res.status(201).json(movie)
}
const getMovieImage = (req, res)=>{
    if(!req.params.name){
        return res.status(200).json({message: "missing data"})
    }
    res.sendFile(__dirname + `/uploads/${req.params.name}`)
}

const editMovie = async (req, res)=>{
    const auth = verify.movieSchema.validate(req.body)
    if(auth.error){
        return res.status(400).json(auth.error)
    }
    const update = await controllers.updateMovie(req.body)
    if(!update){
        return res.status(400).json({message: "Internal Error"})
    }
    res.status(201).json({message: `movie  ${update} update succesfully`})
}

const deleteMovie = async (req, res) =>{
    if(!req.params.name){
        return res.status(400).json({message: "Missing Data"})
    }
    const movieDelete = await controllers.destroyMovie(req.params.name)
    if(!movieDelete){
        return res.status(400).json({message: "Internal Error or user not found"})
    }
    res.status(200).json({message:"Movie delete succesfully"})
}
module.exports ={
    getAllMovies,
    getMovieDetails,
    registerMovie,
    getMovieImage,
    editMovie,
    deleteMovie
}