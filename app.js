const express = require('express')
const app = express()

//express is doing a get req to the base URL
app.get('/', (req, res) => {
  res.send('Welcome to our new App')
})

app.listen(3000)
