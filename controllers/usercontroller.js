const { User, Thought } = require('../models');

module.exports = {

// Get all users
getUser(req, res) {
    User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
},
// Get a user 

// Create a user

// Delete a user

// Update a user

// Add a friend

// Delete a friend

};