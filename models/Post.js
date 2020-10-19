let Post = function (data) {
  this.data = data
  this.errors = []
}

Post.prototype.cleanUp = function () {
  if (typeof (this.data.title) != 'string') { this.data.title = '' }
  if (typeof (this.data.body) != 'string') { this.data.body = '' }

  // only allow the specific properties in the object
  this.data = {
    title: this.data.title.trim(),
    body: this.data.body.trim(),
    createdDate: new Date()
  }
}

Post.prototype.validate = function () {
  if (this.data.title === '') { this.errors.push('You must provide a title.') }
  if (this.data.body === '') { this.errors.push('You must provide post content.') }
}

Post.prototype.create = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp()
    this.validate()
    if (!this.errors.length) {
      // save this post into the database
    } else {
      reject(this.errors)
    }
  })
}

module.exports = Post
