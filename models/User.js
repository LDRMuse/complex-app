//This file as (User) gets called by the userController


// storing user input
let User = function (data) {
  this.data = data
  this.errors = []
}


User.prototype.validate = function () {
  if (this.data.username === "") { this.errors.push('You must provide a username') }
  if (this.data.username.length > 0 && this.data.username.length < 3) { this.errors.push('Username must be at least 3 characters') }
  if (this.data.username.length > 30) { this.errors.push('Username cannot exceed 30 characters.') }
  if (this.data.email === "") { this.errors.push('You must provide a valid email address') }
  if (this.data.password === "") { this.errors.push('You must provide a password') }
  if (this.data.password.length > 0 && this.data.password.length < 12) { this.errors.push('Password must be at least 12 characters') }
  if (this.data.password.length > 100) { this.errors.push('Password cannot exceed 100 characters.') }

}

User.prototype.register = function () {
  // step 1. Validate user data
  this.validate()
  // step 2. Only if there are no errors,
  // then save user data into database
}


module.exports = User
