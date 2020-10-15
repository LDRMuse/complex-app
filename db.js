const mongodb = require('mongodb')
const dotenv = require('dotenv')

dotenv.config();

const connectionString = process.env.MONGO_CONNECTION

mongodb.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
  module.exports = client.db()
  const app = require('./app')
  app.listen(process.env.PORT)
})
