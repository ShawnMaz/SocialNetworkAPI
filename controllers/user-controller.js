const {User} = require('../models');
const {Types} = require('mongoose');

const userController = {
    //get all users
    getAllUsers(req, res){
        User.find({})
            .populate(
                {
                    path:'thoughts',
                    select:'-__v'
                },
                // {
                //     path:'friends',
                //     select:'-__v'
                // }
            )
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
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
            }, 
            {new:true}
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message:`Unable to find the user with the id: ${params.id}`});
                return;
            }
            res.json({message:'User deleted'});
        })
        .catch(err => res.status(500).json(err));
    }, 

    // add a friend
    addFriend({params}, res){
        User.findOne(
            {_id:params.friendId}
            )
            .then(dbFriendData => {
                if(!dbFriendData){
                    res.status(404).json({message: `Unable to find the friend with id: ${params.friendId}`});
                    return;
                }
                return User.findOneAndUpdate(
                    {_id: params.userId},
                    {$push:{friends:params.friendId}},
                    {new:true}
                    )
                    .then(dbUserData => {
                        if(!dbUserData){
                            res.status(404).json({message:`Unable to find user with the id: ${params.userId}`});
                            return;
                        }
                        res.json(dbUserData);
                    })
                    .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
    }, 

    // remove a friend
    removeFriend({params}, res){
        User.findOneAndUpdate(
            {_id:params.userId},
            {$pull:{friends:params.friendId}},
            {new:true}
        )
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({message:`Unable to find the user with the user id: ${params.userId}`});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(404).json(err));
    }
}

module.exports = userController;

