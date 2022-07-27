const router = require('express').Router();
const authHttp = require('./auth.http')
// const passport = require('passport');
// require('../tools/auth')(passport)
// passport.authenticate('jwt', {session: false}) ,
 
router.route('/register')
    .post(authHttp.registerUser)

router.route('/login')
    .post(authHttp.loginUser)
    
module.exports = {
    router
}