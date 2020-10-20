//middleware - logical functions are created in the models

const Post = require('../models/Post')

// this just shows this page when making a GET request to the specific route shown in hte router
exports.viewCreateScreen = function (req, res) {
  res.render('create-post')
}

// this passes the data to the controller so that the controller can use it
exports.create = function (req, res) {
  let post = new Post(req.body, req.session.user._id)
  post.create()
    .then(() => {
      res.send('new post created')
    })
    .catch((errors) => {
      res.send(errors)
    })
}

// req.params.id connects to the :id set up in the router
exports.viewSinglePost = async function (req, res) {
  try {
    let post =  await Post.findSingleById(req.params.id)
    res.render('single-post-screen', { post: post })
  } catch (error) {
    res.render("four04.ejs")
  }
}
