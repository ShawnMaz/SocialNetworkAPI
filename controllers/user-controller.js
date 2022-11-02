const User = require('../models');

const userController = {
    //get all users
    getAllUsers(req, res){
        User.find({})
            .populate(
                {
                    path:'thoughts',
                    select:'-__v'
                },
                {
                    path:'friends',
                    select:'-__v'
                }
            )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(500).json(err));
    }, 

    //get one user by id
    getOneUser({params}, res){
        User.findOne(
            {
                _id:params.id
            }
        )
        .then(dbUserdata => {
            if(!dbUserdata){
                res.status(404).json({message:`Unable to find the user with the id: ${params.id}`});
                return;
            }
            res.json(dbUserdata);
        })
        .catch(err => res.status(500).json(err));
    },
    
    //create new user
    createNewUser({body}, res){
        console.log(body);
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    //update a user by id
    getOneUserAndUpdate({params, body}, res){
        User.findOneAndUpdate(
            {
                _id:params.id
            }, 
            body,
            {
                new:true,
                runValidators:true
            }
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message:`Unable to find the user with the id: ${params.id}`});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
    }, 

    // delete a user by id
    deleteUser({params}, res){
        User.findOneAndDelete(
            {
                _id:params.id
            }
        )
        .then(dbUserdata => {
            if(!dbUserData){
                res.status(404).json({message:`Unable to find the user with the id: ${param.id}`});
                return;
            }
            res.json(dbUserdata);
        })
        .catch(err => res.status(500).json(err));
    }
}

module.exports = userController;

