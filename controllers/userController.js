const User = require('../models/User')

// this function just connects the business logic from the models folder
exports.login = function (req, res) {
  let user = new User(req.body)
  user.login()

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
