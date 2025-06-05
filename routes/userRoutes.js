const express = require('express');
const router = express.Router();
const mongoose = express('mongoose')

const userController = require('../controllers/userside/userController');

// User registration route
router.post('/register', userController.registerUser);


module.exports = router; 