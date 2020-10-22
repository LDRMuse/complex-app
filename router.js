// this is where we create/assign the routes

const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')

// user related routes
router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

// post related routes
router.get('/create-post', userController.mustBeLoggedIn , postController.viewCreateScreen)
router.post('/create-post', userController.mustBeLoggedIn , postController.create)
router.get('/post/:id', postController.viewSinglePost) // did not include mustBeLoggedIn because we want guests to view the post
router.get('/post/:id/edit', postController.viewEditScreen)
router.post('/post/:id/edit', postController.edit)

//profile related routes
router.get('/profile/:username', userController.ifUserExists, userController.profilePostsScreen)


module.exports = router
