const express = require('express')
const {PasswordRecovery} = require('../controllers/userForgetController')
const userForgetRoutePassword = express.Router()

userForgetRoutePassword.post("/userForget",  PasswordRecovery)


module.exports = userForgetRoutePassword