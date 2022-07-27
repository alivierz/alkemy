const router = require('express').Router();
const moviesHttp = require('./movies.http')
const multer = require('multer')
const passport = require('passport');
require('../tools/auth')(passport)


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/movies/uploads')
    },
    filename: (req, file, cb) =>{
        cb(null,Date.now() + file.originalname)
    }
})
const upload = multer({storage})

// RUTAS
router.route('/movies')
    .get(passport.authenticate('jwt', {session: false}), moviesHttp.getAllMovies)
    .post(passport.authenticate('jwt', {session: false}), upload.single('image') , moviesHttp.registerMovie)

router.route('/movies/:name')
    .get(moviesHttp.getMovieImage)
    .put(passport.authenticate('jwt', {session: false}), moviesHttp.editMovie)
    .delete(passport.authenticate('jwt', {session: false}), moviesHttp.deleteMovie)

router.route('/movies/:name/details')
    .get(passport.authenticate('jwt', {session: false}), moviesHttp.getMovieDetails)    
    
module.exports = {
    router
}