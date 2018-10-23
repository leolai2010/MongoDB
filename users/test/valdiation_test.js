const assert = require('assert');
const User = require('../src/user');

describe('Validating records', ()=>{
    it('requires a user name', ()=>{
        const user = new User({ name: undefined });
        //using validate can return asynchronous results of validation
        //validateSync (synchronous process) will show the results of validation  
        const validationResult = user.validateSync();
        //this message is mapped through console.log and see the nested objects
        // the below value is the same as 
        // message = validationResult.errors.name.message
        const { message } = validationResult.errors.name;
        //lastly we assert that message should produce the validation message as follow
        assert(message === 'Name is required.');
    });
    it('requires a user\'s name longer than 2 characters', ()=>{
        const user = new User({ name: 'Al' });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than 2 characters');
    });
    it('disallows invalid records from being saved', (done)=>{
        const user = new User({name:'Al'});
        user.save()
        //if its invalid always use a catch statement!
            .catch((validationResult)=>{
                const { message } = validationResult.errors.name;
                assert(message === 'Name must be longer than 2 characters'); 
                done();
            });
    });
});