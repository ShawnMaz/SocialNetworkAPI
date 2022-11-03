const router = require('express').Router();
const {
    createThought, 
    getAllThoughts, 
    getThoughtById, 
    updateThoughtById, 
    deleteThoughtById, 
    createReaction
} = require ('../../controllers/thought-controller');

router
    .route('/')
    .post(createThought)
    .get(getAllThoughts);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThoughtById);

router
    .route('/:userId/:thoughtId')
    .delete(deleteThoughtById);

router
    .route('/:thoughtId/reactions')
    .post(createReaction);

module.exports = router;