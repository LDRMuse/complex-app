//middleware - logical functions are created in the models

const User = require('../models/User')

exports.mustBeLoggedIn = function (req, res, next) {
  if (req.session.user) {
    next()
  } else {
    req.flash('errors', 'You must be logged in to perform that action')
    req.session.save(function () {
      res.redirect('/')
    })
  }
}

// this function just connects the business logic from the models folder
exports.login = function (req, res) {
  let user = new User(req.body)
  // retrieving the promise from Users.js
  // .then() states what we want if the promise succeeds
  // .catch() states what we want if the promise fails
  user.login()
    .then(function (result) {
      // take the request, use unique session per user and add new properties to session
      req.session.user = { avatar: user.avatar, username: user.data.username, _id: user.data._id }
      // use save() to save credentials while db is updating
      req.session.save(() => {
        res.redirect('/')
      })
      // err comes from the reject param in the Promise from Users.js
    }).catch(function (err) {
      req.flash('errors', err)
      req.session.save(() => {
        res.redirect('/')
      })
    })
}

exports.logout = function (req, res) {
  req.session.destroy(function () {
    res.redirect('/')
  })
}

exports.register = function (req, res) {
  let user = new User(req.body)
  user.register()
    .then(() => {
      req.session.user = { username: user.data.username, avatar: user.avatar, _id: user.data._id }
      req.session.save(() => {
        res.redirect('/')
      })
    })
    .catch((regErrors) => {
      regErrors.forEach(function (error) {
        req.flash('regErrors', error)
      })
      req.session.save(() => {
        res.redirect('/')
      })
    })
}

exports.home = function (req, res) {
  // if there is a request with the tied session to the user exists, send them the "welcome" message
  if (req.session.user) {
    res.render('home-dashboard')
  }
  else {
    res.render('home-guest', { errors: req.flash('errors'), regErrors: req.flash('regErrors') })
  }
}


exports.ifUserExists = function (req, res, next) {
  User.findByUsername(req.params.username).then(function (userDocument) {
    // profileUser is a property we just created on the request object
    req.profileUser = userDocument
    next()
  }).catch(function () {
    res.render("four04")
  })
}

// displays the profile HTML page using ejs
exports.profilePostsScreen = function (req, res) {
  // add second argument as an object of data
  // this data comes from the profileUser that we created above
  res.render('profile', {
    profileUsername: req.profileUser.username,
    profileAvatar: req.profileUser.avatar
  })
}
