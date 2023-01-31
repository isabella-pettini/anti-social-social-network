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
    User.findOneAndDelete({ _id: req.params.userId })
    .then((user) => 
    !user
        ? res.status(404).json({ message: 'No user with that id'})
        : Thought.deleteMany({ _id: { $in: user.thoughts } })
    )
    .then(() => res.json({ message: 'User and Thought deleted'}))
    .catch((err) => res.status(500).json(err));
},

// Update a user
updateUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'No user with that id'})
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
},

// Add a friend
addFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId }},
        { new: true }
    )
        .then((friend) => 
        !friend
            ? res.status(404).json({ message: 'No user with that id'})
            : res.json(friend)
        )
        .catch((err) => res.status(500).json(err));
},

// Delete a friend
deleteFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId }},
        { new: true }
    )
        .then((friend) =>
        !friend
            ? res.status(404).json({ message: 'No user with that id'})
            : res.json(friend)
        )
        .catch((err) => res.status(500).json(err));
}
};