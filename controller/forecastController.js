const logger = require('../services/loggerService')
const forecastService = require('../services/forecastService')

exports.getCurrentForecast = async (req, res, next) => {
    try {
        const cities = Array.isArray(req.query.cities)? req.query.cities : [req.query.cities]
        const forecast = await forecastService.getCurrentForecast(
            cities
        )
        res.sendData(forecast)
    } catch (e) {
        logger.error(`Error: ${e.message}`, e)
        res.status(500).send(e.message)
        next()
    }
}

exports.getForecast = async (req, res, next) => {
    try {
        const cities = Array.isArray(req.query.cities)? req.query.cities : [req.query.cities]
        const forecast = await forecastService.getForecast(cities)
        res.sendData(forecast)
    } catch (e) {
        logger.error(`Error: ${e.message}`, e)
        res.status(500).send(e.message)
        next()
    }
}
