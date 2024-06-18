const express = require('express');
const router = express.Router();
const newsEventsController = require('../../controllers/client/news-events.controller');

router.get('/', newsEventsController.index);

module.exports = router;
