const logger = require('../services/loggerService')
exports.getLocationIp = async (req, res, next) => {
    try {
        res.sendData(req.query.cities)
    } catch (e) {
        logger.error(`Error: ${e.message}`, e)
        res.status(500).send(e.message)
        next()
    }
}
