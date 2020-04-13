const { Router } = require('express')
const forecastController = require('../controller/forecastController')
const router = Router()

router.get('/current', forecastController.getCurrentForecast)
router.get('/forecast', forecastController.getForecast)

module.exports = router
