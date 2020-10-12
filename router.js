const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')

// creating a route to display home-guest HTML file when the user goes to the base URL http://locoalhost:3000/
router.get('/', userController.home)
router.post('/register', userController.register)

module.exports = router
