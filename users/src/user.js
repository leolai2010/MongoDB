const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String
});

const User = mongoose.model('user', UserSchema);
// this makes a collection named 'user'
// const User is now a class 
module.exports = User; 
// exporting as model path reference