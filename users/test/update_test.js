const assert = require('assert');
const User = require('../src/user');

describe('Updating records', ()=>{
    let joe;
    beforeEach((done)=>{
        joe = new User({ name: 'Joe'});
        joe.save()
            .then(()=> done());
    });
    //making a helper function to do assertions
    function assertName(operation, done){
        operation
            .then(()=> User.find({}))
                .then((users)=>{
                    assert(users.length === 1);
                    assert(users[0].name === 'Alex');
                    done();
                })
                .catch((error) => {
                    console.log(error)
                    assert(error,'Promise error');
                    done();
                });
    }
    //instance type update using Set
    it('model instance type update using Set', (done)=>{
        //find the attribute and replace value with desired one 
        joe.set('name', 'Alex');
        //modified with helper function 
        assertName(joe.save(), done);
        // joe.save() //this called will save all preivously modified set statements
        //     .then(()=> User.find({}))
        //         .then((users)=>{
        //             assert(users.length === 1);
        //             assert(users[0].name === 'Alex');
        //             done();
        //         });
    });
    //instance type update using updateOne
    it('model instance type update using UpdateOne', (done)=>{
        joe.updateOne({name: 'Alex'}, done) //same idea of Set
    });
    // class type update using update for all matching criteria
    it('class type update', (done)=>{
        //wrap helper function around it to test!
        assertName(
            User.updateMany({name:'Joe'}, {name:'Alex'}, done)
        );
    });
    //this update is used on specific criteria
    it('class type update one record', (done)=>{
        assertName(
            User.findOneAndUpdate({name:'Joe'}, {name: 'Alex'}, done)
        );
    });
    //find specific ID then update it 
    it('class type update one record by Id', (done)=>{
        assertName(
            User.findByIdAndUpdate(joe._id, {name: 'Alex'}, done)
        );
    })
    it('class type update postcount incrementation', (done)=>{
        //specific update to increment the postcount of a user!
        // using MongoDB Update Operators to avoid loading all data into server!
        //decrementation is done by incrementing a negative value 
        User.update({name: 'Joe'}, {$inc: {postCount: 1}})
            .then(()=>User.findOne({name:'Joe'}))
            .then((user)=>{
                assert(user.postCount === 1);
                done();
            })
    });
    //sidenote all thou all tests are passing remember these methods are likely deprecated!
})