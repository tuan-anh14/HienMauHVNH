const newsEventsRoutes = require('./news-events.router');

module.exports = (app) => {
    app.use('/', newsEventsRoutes);
};
