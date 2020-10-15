const User = require('../models/User')

// this function just connects the business logic from the models folder
exports.login = function (req, res) {
  let user = new User(req.body)
  // retrieving the promise from Users.js
  // .then() states what we want if the promise succeeds
  // .catch() states what we want if the promise fails
  user.login()
    // result is resolve
    .then(function (result) {
      res.send(result)
      // err is reject
    }).catch(function (err) {
      res.send(err)
    })
}

exports.logout = function () {

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
  res.render('home-guest')
}
