const router = require('express').Router();
const characterHttp = require('./characters.http')
const multer = require('multer')
const passport = require('passport');
require('../tools/auth')(passport)


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/characters/uploads')
    },
    filename: (req, file, cb) =>{
        cb(null,Date.now() + file.originalname)
    }
})
const upload = multer({storage})



// RUTAS
router.route('/characters')
    .get(passport.authenticate('jwt', {session: false}), characterHttp.getAllCharacters)
    .post(passport.authenticate('jwt', {session: false}), upload.single('image') , characterHttp.registerCharacter)
    

router.route('/characters/:name')
    .get(characterHttp.imageGallery)
    .delete(passport.authenticate('jwt', {session: false}), characterHttp.deleteCharacter)
    .put(passport.authenticate('jwt', {session: false}),  characterHttp.updateCharacter)


router.route('/characters/:name/details')
    .get(passport.authenticate('jwt', {session: false}) ,characterHttp.getOneCharacter)    
    
    
module.exports = {
    router
}