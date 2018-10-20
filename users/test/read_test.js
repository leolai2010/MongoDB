const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', ()=>{
    let joe;
    beforeEach((done)=>{
        joe = new User({ name: 'Joe'});
        joe.save()
            .then(()=>done());
    });
    it('finds all user with a name of joe', (done)=>{
        User.find({ name:'Joe'}) //find all of the user named Joe 
            .then((users)=>{
                assert(users[0]._id.toString() === joe._id.toString())
                //toString is called because ids are wrapped in objects for mongoDB
                done();
            });
    });
    it('find a user with a particular id', (done)=>{
        User.findOne({ _id: joe._id })
            .then((user)=>{ //singular because only one user!
                assert(user.name === 'Joe');
                done();
            });
    })
});