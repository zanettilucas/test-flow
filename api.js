const bodyParser = require('body-parser')
const express = require('express')
const env = require('dotenv').load()
const router = require('./router')
const ipMiddleware = require('./middleware/ipMiddleware')

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Lo estoy usando en el middleware porque en esta app en todos los casos lo uso.
// Podría ponerselo a c/u, pero preferí usarlo acá exclusivamente por esa razón.
app.use(ipMiddleware.getLocation)

// --- Response standardization
app.use((req, res, next) => {
  res.sendData = (data) => {
    const response = {
      status: 200,
      data,
    }
    res.send(response)
  }
  next()
})

// --- Routes
router.initializeRoutes(app)

// --- Error handling
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  e.status = 404
  next(e)
})

app.listen(3000, () => {
  console.log('Express server listening on port 3000')
})

module.exports = app
