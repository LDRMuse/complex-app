const postsCollection = require('../db').db().collection('posts')
const ObjectID = require('mongodb').ObjectID

// this defines what post will be
let Post = function (data, userId) {
  this.data = data
  this.errors = []
  this.userId = userId
}

// need a function to make sure data is a string
Post.prototype.cleanUp = function () {
  if (typeof (this.data.title) != 'string') { this.data.title = '' }
  if (typeof (this.data.body) != 'string') { this.data.body = '' }

  // only allow the specific properties in the object
  this.data = {
    title: this.data.title.trim(),
    body: this.data.body.trim(),
    createdDate: new Date(),
    author: ObjectID(this.userId)
  }
}

// need a function to make sure all the fields are filled
Post.prototype.validate = function () {
  if (this.data.title === '') { this.errors.push('You must provide a title.') }
  if (this.data.body === '') { this.errors.push('You must provide post content.') }
}

// this function can only happen if the cleanUp and validate functions are made
Post.prototype.create = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp()
    this.validate()
    if (!this.errors.length) {
      postsCollection.insertOne(this.data).then(() => {
        resolve()
      }).catch(() => {
        this.errors.push('Please try again later')
        reject(this.errors)
      })
    } else {
      reject(this.errors)
    }
  })
}

module.exports = Post
