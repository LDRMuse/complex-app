const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const markdown = require('marked')
const app = express()

let sessionOptions = session({
  secret: 'JavaScript is SO COOL',
  store: new MongoStore({ client: require('./db') }),
  resave: false,
  saveUninitialized: false,
  // this formula represents 1 day
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true }
})

app.use(sessionOptions)
app.use(flash())

app.use(function (req, res, next) {
  // make all error and success messages available form all templates
  res.locals.errors = req.flash('errors')
  res.locals.success = req.flash('success')

  // make current user id available on the req object
  if (req.session.user) { req.visitorId = req.session.user._id } else {req.visitorId = 0}
  // make user session data available from within view templates
  res.locals.user = req.session.user
  next()
})

// require() in node executes file and returns whatever that file exports
const router = require('./router')

// boilerplate code; tells express to add the user submitted data onto our request object
app.use(express.urlencoded({ extended: false }))
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
