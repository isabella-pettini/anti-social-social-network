const router = require('express').Router();
const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend

} = require('../../controllers/userController.js');

// api/users

// api/users/:userId

module.exports = router;