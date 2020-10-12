const express = require('express')
const app = express()

// require() in node executes file and returns whatever that file exports
const router = require('./router')

// express is making public folder accessible
app.use(express.static('public'))

// first 'views' is strictly an express option, second 'views' is the name of our folder
// telling express to use the ejs engine (npm i ejs)
app.set('views', 'views')
app.set('view engine', 'ejs')

//express is doing a get req to the base URL
app.get('/', (req, res) => {
  res.render('home-guest')
})

app.listen(3000)
