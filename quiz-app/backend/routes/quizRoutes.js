const express = require('express');
const router = express.Router();
const { submitScore, getScores } = require('../controllers/quizController');

router.post('/submit', submitScore);
router.get('/leaderboard', getScores);

module.exports = router;
