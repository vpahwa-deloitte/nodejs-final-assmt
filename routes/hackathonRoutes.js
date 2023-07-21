const express = require('express');
const router = express.Router();
const hackathonController = require('../controllers/hackathonController');
const { authenticateJWT } = require('../middleware/authMiddleware');

router.get('/', hackathonController.getAllHackathons);
router.get('/search', hackathonController.searchHackathons);

router.post('/', authenticateJWT, hackathonController.createHackathon);
router.patch('/:id', authenticateJWT, hackathonController.updateHackathon);
router.delete('/:id', authenticateJWT, hackathonController.deleteHackathon);

router.post('/:hackathonId/register', authenticateJWT, hackathonController.registerForHackathon);

module.exports = router;
