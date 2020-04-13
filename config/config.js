require('dotenv').config()

const config = {
  port: process.env.PORT || 3000,
  logger: {
    level: process.env.LOGGER_LEVEL || 'info',
    errorFile: process.env.LOGGER_FILE_ERROR || './var/logs/error.log',
    combinedFile: process.env.LOGGER_FILE_COMBINED || './var/logs/combined.log',
    directory: process.env.LOGGER_DIRECTORY || './var/logs'
  },
  apiForecastKey: process.env.API_FORECAST_KEY || 'xxx'
}

module.exports = config
