const {Schema, model} = require('mongoose');
const {isAlphaNumeric, isEmail} = require('validator');

const UserSchema = new Schema(
    {
        username:{
            type:String,
            required: true,
            unqiue:true,
            trim: true
        }, 
        email:{
            type:String,
            required:true, 
            unqiue:true, 
            match:/([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/
        }, 
        thoughts:{
            type:Schema.Types.ObjectId, 
            ref:'Thought'
        }, 
        friends:{
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    }, 
    {
        toJSON: {
            virtuals:true,
        }, 
        id:false

    }
)

UserSchema.virtual('friendCount', function(){
    return this.friends.reduce((total, friend) => total + friend.User.count, 0);
});

const User = model('User', UserSchema);

module.exports = User;