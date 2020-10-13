//This file as (User) gets called by the userController


// storing user input
let User = function(data) {
this.data = data
this.errors = []
}


User.prototype.validate = function() {
if (this.data.username = '') {this.errors.push('You must provide a username')}
if (this.data.email = '') {this.errors.push('You must provide a valid email address')}
if (this.data.password = '') {this.errors.push('You must provide a password')}
}

User.prototype.register = function() {
// step 1. Validate user data
this.validate()
// step 2. Only if there are no errors,
// then save user data into database
}


module.exports = User
