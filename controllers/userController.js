const User = require('../models/User')

// this function just connects the business logic from the models folder
exports.login = function (req, res) {
  let user = new User(req.body)
  // retrieving the promise from Users.js
  // .then() states what we want if the promise succeeds
  // .catch() states what we want if the promise fails
  user.login()
    .then(function (result) {
      // take the request, use unique session per user and add new properties to session
      req.session.user = { username: user.data.username }
      // result is resolve
      res.send(result)
      // err is reject
    }).catch(function (err) {
      res.send(err)
    })
}

exports.logout = function (req, res) {
  req.session.destroy()
  res.send('you are now logged out')
}

exports.register = function (req, res) {
  let user = new User(req.body)
  user.register()
  if (user.errors.length) {
    res.send(user.errors)
  } else {
    res.send('Congrats, no errors')
  }
}

exports.home = function (req, res) {
  // if there is a request with the tied session to the user exists, send them the "welcome" message
  if (req.session.user) {
    res.render('home-dashboard', { username: req.session.user.username })
  }
  else {
    res.render('home-guest')
  }
}
