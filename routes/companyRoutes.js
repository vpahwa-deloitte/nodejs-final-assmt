const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const { authenticateJWT } = require('../middleware/authMiddleware');

router.get('/', authenticateJWT, companyController.getAllCompanies);
router.post('/', authenticateJWT, companyController.createCompany);
router.patch('/:id', authenticateJWT, companyController.updateCompany);
router.delete('/:id', authenticateJWT, companyController.deleteCompany);

module.exports = router;
