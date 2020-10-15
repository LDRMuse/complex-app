const usersCollection = require('../db').collection("users")
const validator = require("validator")

let User = function (data) {
  this.data = data
  this.errors = []
}

User.prototype.cleanUp = function () {
  if (typeof (this.data.username) != "string") { this.data.username = "" }
  if (typeof (this.data.email) != "string") { this.data.email = "" }
  if (typeof (this.data.password) != "string") { this.data.password = "" }

  // get rid of any bogus properties
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password
  }
}

User.prototype.login = function () {
  this.cleanUp()
  // go into the db, find the username that matches the user input (this.data.username)
  // then take the second arg as a function that calls once the first argument is complete
  // then in that function, create an error message if !user
  // if user, then pass that document of data as a parameter into the function
  // this time we used an arrow function because "this" will tie to it rather than tieing the the global function
  usersCollection.findOne({ username: this.data.username }, (err, user) => {
  // if this is a user, && if the user.password equals the user's input password (this.data.password)
    if (user && user.password === this.data.password) {
console.log('congrats')
    }
    else {
console.log('invalid username/password')
    }
  })
}




User.prototype.validate = function () {
  if (this.data.username == "") { this.errors.push("You must provide a username.") }
  if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) { this.errors.push("Username can only contain letters and numbers.") }
  if (!validator.isEmail(this.data.email)) { this.errors.push("You must provide a valid email address.") }
  if (this.data.password == "") { this.errors.push("You must provide a password.") }
  if (this.data.password.length > 0 && this.data.password.length < 12) { this.errors.push("Password must be at least 12 characters.") }
  if (this.data.password.length > 100) { this.errors.push("Password cannot exceed 100 characters.") }
  if (this.data.username.length > 0 && this.data.username.length < 3) { this.errors.push("Username must be at least 3 characters.") }
  if (this.data.username.length > 30) { this.errors.push("Username cannot exceed 30 characters.") }
}

User.prototype.register = function () {
  // Step #1: Validate user data
  this.cleanUp()
  this.validate()

  // Step #2: Only if there are no validation errors
  // then save the user data into a database
  if (!this.errors.length) {
    usersCollection.insertOne(this.data)
  }
}

module.exports = User
