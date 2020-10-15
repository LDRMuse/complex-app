const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')

// creating routes set up in home-guest HTML file
//to display content when the user goes to certain URLs
// userController holds a collection of factory functions
router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router
