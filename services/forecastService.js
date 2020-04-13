const requestRepository = require('../repository/requestRepository')
const logger = require('./loggerService')
const apiForecastKey = require('../config/config').apiForecastKey

exports.getCurrentForecast = async (cities) => {
    try {
        const citiesForecast = await forecast(cities, `/data/2.5/weather`)
        return citiesForecast
    } catch (e) {
        logger.error(`Error: ${e.message}`, e)
        return e
    }
}

exports.getForecast = async (cities) => {
    try {
        const citiesForecast = await forecast(cities, `/data/2.5/forecast`)
        return citiesForecast
    } catch (e) {
        logger.error(`Error: ${e.message}`, e)
        return e
    }
}

const forecast = async (cities, path) => {
    const data = { appid: apiForecastKey }
    const citiesForecastPromise = []
    for (let i = 0; i < cities.length; i++) {
        data.q = cities[i]
        citiesForecastPromise.push(requestRepository.performRequest(
            'api.openweathermap.org',
            path,
            'GET',
            'http',
            data
        ))
    }
    try {
        const cities = await Promise.all(citiesForecastPromise)
        return cities
    } catch (e) {
        logger.error(`Error: ${e.message}`, e)
        return e
    }
}
