const locationRouter = require('./locationRouter')
const forecastRouter = require('./forecastRouter')

const baseRoute = '/v1'

const initializeRoutes = (app) => {
    // -- API status
    app.use('/status', (req, res) => {
        res.sendData({ message: "I'm alive and well. Thank you." })
    })

    app.use(`${baseRoute}/location`, locationRouter)
    app.use(`${baseRoute}/`, forecastRouter)
}
module.exports = { initializeRoutes }
