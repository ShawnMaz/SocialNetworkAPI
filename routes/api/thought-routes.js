const router = require('express').Router();
const {
    createThought, 
    getAllThoughts, 
    getThoughtById, 
    updateThoughtbyId
} = require ('../../controllers/thought-controller');

router
    .route('/')
    .post(createThought)
    .get(getAllThoughts);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThoughtbyId);

module.exports = router;