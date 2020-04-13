const ipFinderService = require('../services/ipFinderService')
const logger = require('../services/loggerService')

const getLocation = async (req, res, next) => {
    try {
        if (!req.query.cities) {
            // Inyectar valores en queryparams no es lo ideal pero por simplicidad preferí usarlo.
            // Por ser un ejercicio.
            req.query.cities = []
            req.query.cities.push(
                await ipFinderService.getLocation(req.connection.remoteAddress)
            )
        }
        next()
    } catch (e) {
        logger.error(`Error: ${e.message}`, e)
    }
}
module.exports = { getLocation }
