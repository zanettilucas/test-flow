const bodyParser = require('body-parser');
const express = require('express');
const env = require('dotenv').load();
const router = require('./router');


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- Response standardization
app.use((req, res, next) => {
  res.sendData = function sendData(data) {
    const response = {
      status: 200,
      data,
    };
    res.send(response);
  };
  next();
});

// --- Routes
router.initializeRoutes(app);

// --- Error handling
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});

module.exports = app;
