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
    }
}

module.exports = thoughtController;