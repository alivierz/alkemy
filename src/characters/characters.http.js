const verify = require('../tools/verify')
const controllers = require('./characters.controllers')

const registerCharacter = async (req, res) =>{
    if(!req.file.filename){
        return res.status(400).json({message: "Need An Image"})
    }
    const auth = verify.charactersSchema.validate(req.body)
    if(auth.error){
         return res.status(400).json(auth.error)
    }
    const newCharacter = {
        ...req.body,
        image: `localhost:8000/characters/${req.file.filename}`
    }
    const character = await controllers.createCharacter(newCharacter)
    if(!character){
        return res.status(400).json({message: "Internal Error"})
    }
    res.status(201).json(character)
}

const imageGallery = (req, res) =>{
    res.sendFile(__dirname + `/uploads/${req.params.name}`)
}

const getAllCharacters = async (req, res) =>{
    if(req.query.name){
        const data = req.query.name
        const characterFilter = await controllers.getCharacterByFillterName(data)
        if(!characterFilter){
            return res.status(400).json({message: "Internal Error"})
        }
        return res.status(200).json(characterFilter)
    }
    if(req.query.age){
        const data = req.query.age
        const characterFilter = await controllers.getCharacterByFillterAge(data)
        if(!characterFilter){
            return res.status(400).json({message: "Internal Error"})
        }
        return res.status(200).json(characterFilter)
    }
    if(req.query.idMovie){
        const data = req.query.idMovie
        const characterFilter = await controllers.getCharacterByFillterIdMovie(data)
        if(!characterFilter){
            return res.status(400).json({message: "Internal Error"})
        }
        const characters = []
        characterFilter.forEach(element => {
            characters.push(element['character_rel_character'])
        });
        return res.status(200).json({characters})
    }
    const allCharacters = await controllers.getAll()
    if(!allCharacters){
        return res.status(400).json({message: "Bad Request"})
    }
    res.status(200).json(allCharacters)
}

const deleteCharacter = async (req, res) =>{
    if(!req.params.name){
        return res.status(200).json({message: "Invalid Character"})
    }
    const deleteChar = await controllers.deleteCharacterDataBase(req.params.name)
    if(!deleteChar){
        return res.status(400).json({message: "Delete succesfully"})
    }
    res.status(200).json({message: `character ${deleteChar} succesfully delete`})
}

const updateCharacter = async (req, res) =>{
    const auth = verify.charactersSchema.validate(req.body)
    if(auth.error){
        return res.status(400).json(auth.error)
    }
    const update = await controllers.updateTheCharacter(req.body, req.params.name)
    if(!update){
        return res.status(400).json({message: "Internal Error"})
    }
    res.status(202).json(update)
}
const getOneCharacter = async (req, res)=>{
    if(!req.params.name){
        return res.status(400).json({message: "Missing data"})
    }
    const character = await controllers.getDetails(req.params.name)
    if(!character){
        return res.status(400).json({message: "Internal Error"})
    }
    res.status(200).json({character})
}

module.exports ={
    registerCharacter,
    imageGallery,
    getAllCharacters,
    deleteCharacter,
    updateCharacter,
    getOneCharacter
}