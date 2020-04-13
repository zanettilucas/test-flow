const requestRepository = require('../repository/requestRepository')
const logger = require('./loggerService')

exports.getLocation = async (ip) => {
    try {
        const location = await requestRepository.performRequest(
            'www.ip-api.com',
            `json/${ip}`,
            'GET',
            'http'
        )
        return location
    } catch(e) {
        logger.error(`Error: ${e.message}`, e)
        return e
    }
}
