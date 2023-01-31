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
createUser(req, res) {
    User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
},

// Delete a user - bonus: remove a users thoughts when deleted
deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.courseId })
    .then((user) => 
    !user
        ? res.status(404).json({ message: 'No user with that id'})
        : Thought.deleteMany({ _id: { $in: user.thoughts } })
    )
    .then(() => res.json({ message: 'User and Thought deleted'}))
    .catch((err) => res.status(500).json(err));
},

// Update a user

// Add a friend

// Delete a friend

};