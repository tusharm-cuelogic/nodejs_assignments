//include files
var app = require('../app'),
	should = require('should'),
	supertest = require("supertest");

// Using check login
describe('User: login', function() {
	var user = [
    {
        title: 'Email address blank',
        userdata:{
            email: '',
            password:'123456'
        }
    },
	{
        title: 'Email address fail',
        userdata:{
            email: 'prasannagmail.com',
            password:'123456'
        }
    },
	{
        title: 'Blank password',
        userdata:{
            email: 'prasanna@gmail.com',
            password:''
        }
    },
	{
        title: 'Wrong password',
        userdata:{
            email: 'prasanna@gmail.com',
            password:'1233345'
        }
    }];

    //Avoid multiple it conditions using forEach
    user.forEach(function(getArrSignDetails) {
        it(getArrSignDetails.title, function(done) {
        supertest(app)
            .post('/signin')
            .send(getArrSignDetails.userdata)
            .expect(500)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                } else if (res.error) {
                    return done(res.error.text);
                }
                done();
            });
        });
    });
});


//User sign up
describe('User: Register', function() {
	var userDetails = [
    {
        title: 'User First name blank',
        userNewdata: {
            firstname: '',
            lastname:'patil',
            email: 'raj@gmail.com',
            password:'123456'
        }
    },
    {
        title: 'User Last name blank',
        userNewdata: {
            firstname: 'prasanna',
            lastname:'',
            email: 'raj@gmail.com',
            password:'123456'
        }
    },
    {
        title: 'Email address blank',
        userNewdata: {
            firstname: 'prasanna',
            lastname:'patil',
            email: '',
            password:'123456'
        }
    },
	{
        title: 'Email address fail',
        userNewdata: {
            firstname: 'prasanna',
            lastname:'patil',
            email: 'prasannagmail.com',
            password:'123456'
        }
    },
	{
        title: 'Email already exists',
        userNewdata: {
            firstname: 'prasanna',
            lastname:'patil',
            email: 'prasanna@gmail.com',
            password:'1233345'
        }
    },
	{
        title: 'Wrong password',
        userNewdata: {
            firstname: 'prasanna',
            lastname:'patil',
            email: 'prasanna@gmail.com',
            password:''
        }
    }];

    //Avoid multiple it conditions using forEach
    userDetails.forEach(function(getArrSignUpDetails) {
        it(getArrSignUpDetails.title, function(done) {
        supertest(app)
            .post('/signup')
            .send(getArrSignUpDetails.userNewdata)
            .expect(500)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                } else if (res.error) {
                    return done(res.error.text);
                }
                done();
            });
        });
    });
});