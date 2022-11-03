const router = require('express').Router();
const {
    createThought, 
    getAllThoughts
} = require ('../../controllers/thought-controller');

router
    .route('/')
    .post(createThought)
    .get(getAllThoughts);

module.exports = router;