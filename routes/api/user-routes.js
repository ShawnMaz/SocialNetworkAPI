const router = require('express').Router();
const {
    getAllUsers, 
    getOneUser, 
    createNewUser, 
    getOneUserAndUpdate, 
    deleteUser
} = require('../../controllers/user-controller');

// setup GET and POST for /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createNewUser);

// setup GET one, PUT and DELETE for /api/users/:id
router
    .route('/:id')
    .get(getOneUser)
    .put(getOneUserAndUpdate)
    .delete(deleteUser);

module.exports = router;
