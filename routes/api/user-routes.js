const router = require('express').Router();
const {
    getAllUsers, 
    getOneUser, 
    createNewUser, 
    getOneUserAndUpdate, 
    deleteUser, 
    addFriend, 
    removeFriend
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createNewUser);

router
    .route('/:id')
    .get(getOneUser)
    .put(getOneUserAndUpdate)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;
