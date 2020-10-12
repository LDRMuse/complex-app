const express = require('express')
const app = express()

// first 'views' is strictly an express option, second 'views' is the name of our folder
app.set('views', 'views')
// telling express to use the ejs engine (npm i ejs)
app.set('view engine', 'ejs')

//express is doing a get req to the base URL
app.get('/', (req, res) => {
  res.render('home-guest')
})

app.listen(3000)
