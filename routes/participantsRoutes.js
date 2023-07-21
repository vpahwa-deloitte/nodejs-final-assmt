const express = require('express');
const router = express.Router();
const participantsController = require('../controllers/participantsController');
const { authenticateJWT } = require('../middleware/authMiddleware');


router.get('/:hackathonId', authenticateJWT, participantsController.getAllParticipants);
router.post('/:hackathonId', authenticateJWT, participantsController.createParticipant);
router.patch('/:id', authenticateJWT, participantsController.updateParticipant);
router.delete('/:id', authenticateJWT, participantsController.deleteParticipant);

module.exports = router;
