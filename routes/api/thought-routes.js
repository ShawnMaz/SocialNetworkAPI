const router = require('express').Router();
const {
    createThought, 
    getAllThoughts, 
    getThoughtById
} = require ('../../controllers/thought-controller');

router
    .route('/')
    .post(createThought)
    .get(getAllThoughts);

router
    .route('/:id')
    .get(getThoughtById);

module.exports = router;