// User Routes - API endpoints for user operations
const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserById,
  getAllUsers,
  deleteUser,
  toggleFavorite,
  getDashboard,
  updateUser
} = require('../controllers/userController');

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.get('/dashboard/:id', getDashboard);
router.put('/favorite', toggleFavorite);
router.put('/:id', updateUser);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

module.exports = router;
