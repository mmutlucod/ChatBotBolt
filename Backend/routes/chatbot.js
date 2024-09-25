const express = require('express');
const router = express.Router();
const { getOrCreateSession, saveAnswerAndNextQuestion } = require('../controllers/chatbotController');

router.post('/start', getOrCreateSession);
router.post('/answer', saveAnswerAndNextQuestion);

module.exports = router;
