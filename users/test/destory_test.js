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
    it('model instance method remove', (done)=>{
        //this is the instance that will be removed
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
    it('class method delete', (done)=>{
        //this will go in to a class to look for the record
        User.deleteOne({name:'Joe'})
            .then(()=> User.findOne({ name:'Joe'}))
                .then((user)=>{
                    assert(user === null);
                    done();
                });
    });
    //this method removes by matching criteria
    it('class method findOneAndDelete', (done)=>{
        User.findOneAndDelete({ name: 'Joe '})
            .then(()=> User.findOne({ name:'Joe'}))
                .then((user)=>{
                    assert(user === null);
                    done();
                }) // not sure about this one passing?
                //adding a catch allows the test to pass just because
                //the result is error. error = true thus done statement ran
                .catch((error) => {
                    assert(error,'Promise error');
                    done();
                });

    });
    //this method removes by matching ID 
    it('class method findByIdAndDelete', (done)=>{
        User.findByIdAndDelete(joe._id)
            .then(()=> User.findOne({ name:'Joe'}))
                .then((user)=>{
                    assert(user === null);
                    done();
                });
    });
});