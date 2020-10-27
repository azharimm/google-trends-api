const express = require('express');
const trendController = require('../controllers/trendController');
const router = express.Router();

router.get('/', trendController.index);
router.post('/timeline', trendController.timeline);
router.post('/daily', trendController.daily);
router.post('/autocomplete', trendController.autocomplete);
router.post('/region', trendController.region);
router.post('/realtime', trendController.realtime);
router.post('/related-queries', trendController.relatedQueries);
router.post('/related-topics', trendController.relatedTopics);

module.exports = router;