const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', ()=>{
    let joe;
    beforeEach((done)=>{
        joe = new User({ name: 'Joe'});
        joe.save()
            .then(()=>done());
    });
    //used to remove a instance, specific, one record type
    it('model instance remove', (done)=>{
        joe.remove() //once we remove the user it returns a promise 
            .then(()=> User.findOne({ name:'Joe'})) //findOne will return a promise as well
            //using the first promise try to find if the user still exist
                .then((user)=>{
                // by using the second promise
                // if the user assert that the user don't exist should return us true
                    assert(user === null);
                    done();
                });
    });
    //this method removes a lot of records with given criteria
    it('class method remove', (done)=>{
        User.remove({name:'Joe'})
            .then(()=> User.findOne({ name:'Joe'}))
                .then((user)=>{
                    assert(user === null);
                    done();
                });
    });
    it('class method findAndRemove', ()=>{

    });
    it('', ()=>{

    });
});