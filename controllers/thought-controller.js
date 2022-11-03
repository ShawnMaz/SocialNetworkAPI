const {User, Thought} = require('../models');

const thoughtController = {
    // create a thought
    createThought({body}, res){
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    {_id:body.userId}, 
                    {$push:{thoughts: _id}}, 
                    {new:true, runValidators:true}
                )
            })
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({message: `Unable to find a user with the id: ${body.userId}`});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }, 

    // read all thoughts
    getAllThoughts(req, res){
        Thought.find({})
            .select('-__v')
            .sort({_id:-1})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(500).json(err));
    }
}

module.exports = thoughtController;