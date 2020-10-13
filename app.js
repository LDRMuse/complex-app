const express = require('express')
const app = express()

// require() in node executes file and returns whatever that file exports
const router = require('./router')

// boilerplate code; tells express to add the user submitted data onto our request object
app.use(express.urlencoded({extended: false}))
app.use(express.json())



// express is making public folder accessible
app.use(express.static('public'))

// first 'views' is strictly an express option, second 'views' is the name of our folder
// telling express to use the ejs engine (npm i ejs)
app.set('views', 'views')
app.set('view engine', 'ejs')

// express is using the router
app.use('/', router)

module.exports = app
