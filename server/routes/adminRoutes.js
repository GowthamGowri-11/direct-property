// Admin Routes - API endpoints for admin operations
const express = require('express');
const router = express.Router();

const {
  adminLogin,
  createAdmin,
  getTotalUsers
} = require('../controllers/adminController');

// Routes
router.post('/login', adminLogin);
router.post('/create', createAdmin);
router.get('/users/count', getTotalUsers);

module.exports = router;
