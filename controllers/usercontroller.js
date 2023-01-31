const { User, Thought } = require('../models');

module.exports = {

// Get all users
getUser(req, res) {
    User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
},
// Get a user 
getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .select('-__v')
    .then((user) => 
    !user
        ? res.status(404).json({ message: 'No User with that id'})
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
// Create a user

// Delete a user

// Update a user

// Add a friend

// Delete a friend

};