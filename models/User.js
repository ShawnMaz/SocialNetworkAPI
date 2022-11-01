const {Schema, model} = require('mongoose');
const validator = require('validator');

const UserSchema = new Schema(
    {
        username:{
            type:String,
            unique: true,
            required: true,
            trim: true, 
            validate:[validator.isAlphaNumeric, 'Username must be alphanumeric']
        }, 
        email:{
            type:String,
            unique:true,
            required:true,
            validate: [validator.isEmail, 'Email must be a valid email address']
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

const User = new model('User', UserSchema);

module.exports = User;