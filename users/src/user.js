const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { //adding validation to an attribute requires a object property
        type: String,
        //this valdiate function is flexible
        //however the below should work too!
        // minlength: [2, 'Name must be longer than 2 characters']
        validate:{
            validator: (name)=> name.length > 2,
            message: 'Name must be longer than 2 characters'
        },
        required: [true, 'Name is required.']
    },
    postCount: Number
});

const User = mongoose.model('user', UserSchema);
// this makes a collection named 'user'
// const User is now a class 
module.exports = User; 
// exporting as model path reference