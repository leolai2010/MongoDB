const mongoose = require('mongoose'); //code sharing between node by requiring it
mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true }); //connect to database named 'users_test'
// mongoose.Promise = global.Promise;
// new mongoose update should take care of this and use ES6 promise library by default
before((done)=>{
    // this before callback is only excuted once
    mongoose.connection
    //event handler (mongoose library)
    .once('open', ()=>{ done(); }) //once excuted then signal mocha it is done
    .on('error', (error)=>{
        console.warn('Warning', error);
    });
});
beforeEach((done)=>{ //a hook function that will drop the user data before the test is run
    //drop function accepts a call back!
    mongoose.connection.collections.users.drop(()=>{
        //ready to run next test!
        //this is done through passing in the done callback 
        //this callback function is availible if there is mocha
        done();
        //signal to mocha to run next test
        //still has to setTimeOut!
    });
});