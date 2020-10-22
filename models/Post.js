// This file is connected to the Database to perform CRUD

const postsCollection = require('../db').db().collection('posts')
const ObjectID = require('mongodb').ObjectID
const User = require('./User')

// this defines what post will be
let Post = function (data, userId, requestedPostId) {
  this.data = data
  this.errors = []
  this.userId = userId
  this.requestedPostId = requestedPostId
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


//function to update post
Post.prototype.update = function () {
  return new Promise(async (resolve, reject) => {
    try {
      let post = await Post.findSingleById(this.requestedPostId, this.userId)
      if (post.isVisitorOwner) {
        // actually update the DB
        let status = await this.actuallyUpdate()
        resolve(status)
      } else {
        reject()
      }
    } catch {
      reject()
    }
  })
}

// function to connect to DB and actually update
Post.prototype.actuallyUpdate = function () {
  return new Promise(async (resolve, reject) => {
    this.cleanUp()
    this.validate()
    if (!this.errors.length) {
      await postsCollection.findOneAndUpdate({ _id: new ObjectID(this.requestedPostId) }, { $set: { title: this.data.tile, body: this.data.body } })
      resolve('success')
    } else {
      resolve('failure')
    }
  })
}



Post.reusablePostQuery = function (uniqueOperations, visitorId) {
  return new Promise(async function (resolve, reject) {
    // use concat to return a new array and add uniqueOperations onto that array
    let aggOperations = uniqueOperations.concat([
      { $lookup: { from: "users", localField: "author", foreignField: "_id", as: "authorDocument" } },
      {
        $project: {
          title: 1,
          body: 1,
          createdDate: 1,
          authorId: '$author',
          author: { $arrayElemAt: ["$authorDocument", 0] }
        }
      }
    ])
    // creating an array to use mongoDB methods to organize/connect the author to the post
    let posts = await postsCollection.aggregate(aggOperations).toArray()

    // clean up author property in each post object
    posts = posts.map(function (post) {
      // look inside each post to see if visitor is owner bt comparing mongoDB $author to authorID
      post.isVisitorOwner = post.authorId.equals(visitorId)

      // now the new Object in author will only display the username and avatar
      // we go inside the User model, grab the author
      // if the getAvatar is true, then display the gravatar URL as a string (.avatar)
      post.author = {
        username: post.author.username,
        avatar: new User(post.author, true).avatar
      }

      return post
    })

    resolve(posts)
  })
}
// Post is a constructor function, findSingleById is also function; functions are objects
// if the id data is NOT a string OR the data is NOT a valid mongoDB ID, reject()
Post.findSingleById = function (id, visitorId) {
  return new Promise(async function (resolve, reject) {
    if (typeof (id) != "string" || !ObjectID.isValid(id)) {
      reject()
      return
    }

    let posts = await Post.reusablePostQuery([
      { $match: { _id: new ObjectID(id) } }
    ], visitorId)

    if (posts.length) {
      console.log(posts[0])
      resolve(posts[0])
    } else {
      reject()
    }
  })
}
// function to take in the authorId as a param from the controller
Post.findByAuthorId = function (authorId) {
  return Post.reusablePostQuery([
    { $match: { author: authorId } },
    { $sort: { createdDate: -1 } }
  ])
}


module.exports = Post
