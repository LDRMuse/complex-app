const express = require('express')

const router = express.Router()

// creating a route to display home-guest HTML file when the user goes to the base URL http://locoalhost:3000/
router.get('/', (req, res) => {
  res.render('home-guest')
})

module.exports = router
