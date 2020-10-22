//middleware functions to connect to database functions (DB functions are created in the Models file)

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
      req.flash('success', 'New post successfully created')
      req.session.save(() => res.redirect(`/post/id/`))
    })
    .catch((errors) => {
      errors.forEach((error) => req.flash('errors', error))
      req.session.save(() => res.redirect('/create-post'))
    })
}

// req.params.id connects to the :id set up in the router
exports.viewSinglePost = async function (req, res) {
  try {
    let post = await Post.findSingleById(req.params.id, req.visitorId)
    res.render('single-post-screen', { post: post })
  } catch (error) {
    res.render("four04.ejs")
  }
}

// function to view edit screen
exports.viewEditScreen = async function (req, res) {
  try {
    // bring in the post with its content to be able to edit on
    // then after promise is fulfilled, display the edit-post page along with the content
    let post = await Post.findSingleById(req.params.id)
    if (post.authorId == req.visitorId) {
      res.render('edit-post', { post: post })
    } else {
      req.flash('errors', 'You do not have permission to perform that action')
      req.session.save(function() {
        res.redirect('/')
      })
    }
  } catch {
    res.render('four04')
  }
}

//function to edit post
exports.edit = function (req, res) {
  let post = new Post(req.body, req.visitorId, req.params.id)
  post.update().then((status) => {
    // the post was successfully updated in the DB
    // OR user did have permission but were validation errors
    if (status === 'success') {
      // post was updated in DB
      req.flash('success', 'Post successfully updated!')
      req.session.save(function () {
        res.redirect(`/post/${req.params.id}/edit`)
      })
    } else {
      // validation errors
      post.errors.forEach(function (error) {
        req.flash('errors', error)
        req.session.save(function () {
          res.redirect(`/post/${req.params.id}/edit`)
        })
      })
    }
  }).catch(() => {
    // if a post with the request id doesn't exist
    // OR if the current visitor is not he owner of the post
    req.flash('errors', 'You do not have permission to perform that action')
    req.session.save(function () {
      res.redirect('/')
    })
  })
}
