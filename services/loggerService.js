const fs = require('fs')
const config = require('../config/config')

// level numbers
const levels = {
    all: 0,
    debug: 10,
    info: 20,
    warning: 30,
    error: 40,
}
// get the current level
const currentLevel = config.logger.level.toLowerCase()

// create the logs directory
try {
    fs.mkdirSync(config.logger.directory, { recursive: true })
} catch (e) {
    console.error('probably because the log directory already existed')
}
// Create the stream for the log file
const logFileStream = fs.createWriteStream(
    `${config.logger.directory}/app.log`,
    {
        flags: 'a',
    }
)

const logMessage = (level, msg, data) => {
    const levelLower = level.toLowerCase()
    // only log if it is withing the current level
    if (levels[levelLower] >= levels[currentLevel]) {
        if (config.logger.console) {
            const consoleData = data || ''
            if (levelLower === 'error') {
                // eslint-disable-next-line no-console
                console.error(msg, consoleData)
            } else {
                // eslint-disable-next-line no-console
                console.log(msg, consoleData)
            }
        }
        let dataLog = ''
        const dateStr = new Date().toISOString()
        if (typeof data !== 'undefined') {
            // try to parse the object to string
            try {
                dataLog = ` => ${JSON.stringify(data)}`
            } catch (e) {
                // couldn't parse, then concat as it is
                dataLog = ` => ${data}`
            }
        }
        const message = `[${dateStr}] - ${level} - ${msg} ${dataLog}` + '\r\n'
        logFileStream.write(message)
    }
}

const logger = {
    debug(msg, data) {
        logMessage('debug', msg, data)
    },
    info(msg, data) {
        logMessage('info', msg, data)
    },
    warning(msg, data) {
        logMessage('warning', msg, data)
    },
    error(msg, data) {
        logMessage('error', msg, data)
    },
}

module.exports = logger
