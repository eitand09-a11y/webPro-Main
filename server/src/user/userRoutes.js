const express = require('express');
const router = express.Router();
const userController = require('./userController');

// Create a new user
router.post('/', userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

// create a new post route for sign in request, with endpint "sign_in"
// serController.signIn will use getByValue(email  === mongo.email), and then compare the passwords.
router.post('/sign-in', userController.signIn);

// Get a user by ID
router.get('/:id', userController.getUserById);

// Update a user
router.put('/:id', userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router;