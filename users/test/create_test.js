const assert = require('assert'); //importation of testing function
//make sure package.json has mocha as testing script
const User = require('../src/user');
// import model from src
// describe and it -> passes in string and function
describe('Creating records', ()=>{
    it('saves a user', (done)=>{
        //make assertion in the it function
        const joe = new User({ name: 'Joe' });
        // joe is now a instance of a user 
        joe.save()
            .then(()=>{
                //has joe been saved succesfully?
                assert(!joe.isNew);
                //assert that joe is not new
                // indicates that joe is now in the database
                done();
                //resolve the call
            });
        // save is one of the property attach to joe when instance is created
    });
});