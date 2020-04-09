const initializeRoutes = (app) => {
  // -- API status
  app.use('/status', (req, res) => {
    res.sendData({ message: "I'm alive and well. Thank you." });
  });
};
module.exports = { initializeRoutes };
