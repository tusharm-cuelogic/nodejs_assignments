// Include user schema file and bcrypt file
var Promise = require("bluebird"),
	userSchema = Promise.promisifyAll(require('../schemas/user.js')),
    bcrypt = Promise.promisifyAll(require('bcrypt'));

module.exports = {
	signin : fnSignin,
	add: fnAdd
};

function fnSignin (req, res, next) {
	var strEmail = req.body.email,
		password = req.body.password;

	/*userSchema.findOne({'email' : strEmail}, function(err,user) {
		//if user is present
		if (user) {
			//check hash match
			bcrypt.compare(password,  user.hashpassword, function(err, resMatch) {
				if (err) {
					return next(err);
				}
			    // resMatch == true
			    if (resMatch) {
					req.tempStore.data = {
						'status' : 1,
						'message' : 'User authenticated successfully'
					};
					req.session.email = strEmail;
				} else {
					req.tempStore.data = {
						'status' : 0,
						'message' : 'Invalid email or password'
					};
				}
				next();
			});
		} else {
			req.tempStore.data = {
				'status' : 0,
				'message' : 'Invalid email or password'
			};
			next();
		}
	});*/

	userSchema.findOneAsync({'email' : strEmail})
	.then(function (user) {
		//if user is present
		if (user) {
			//check hash match
			bcrypt.compareAsync(password,  user.hashpassword)
			.then(function (resMatch) {
			    // resMatch == true
			    if (resMatch) {
					req.tempStore.data = {
						'status' : 1,
						'message' : 'User authenticated successfully'
					};
					req.session.email = strEmail;
				} else {
					/*req.tempStore.data = {
						'status' : 0,
						'message' : 'Invalid email or password'
					};*/
					return next('Invalid email or password');
				}
				next();
			});
		} else {
			req.tempStore.data = {
				'status' : 0,
				'message' : 'Invalid email or password'
			};
			next();
		}
	}).catch(function (e) {
        return next(e);
    });
}

/*Function fnAdd add new user details*/
function fnAdd (req, res, next) {
	var strFirstName = req.body.firstname,
		strLastName = req.body.lastname,
		strEmail = req.body.email,
		password = req.body.password;

	this.user = {
		firstname: strFirstName,
		lastname: strLastName,
		email: strEmail,
		password: password
	};

	//genrate salt
	/*bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			return next(err);
		}

		bcrypt.hash(password, salt, function(err, hash) {
			if (err) {
				return next(err);
			}
			this.user['hashpassword'] = hash;
			//created object of schema
			var addUser = new userSchema(this.user);

			addUser.save(function (err) {
			 	if (err) {
					return next(err);
				}
			  	// saved!
			  	req.tempStore.data = {
					'status' : 1,
					'message' : 'User added successfully'
				};
				next();
			});
		});
	});*/

	bcrypt.genSaltAsync(10)
	.then(function(salt) {

		return bcrypt.hashAsync(password, salt)
	})
	.then(function(hash) {
			this.user['hashpassword'] = hash;
			//created object of schema
			var addUser = new userSchema(this.user);

			addUser.save(function (err) {
			 	if (err) {
					return next(err);
				}
			  	// saved!
			  	req.tempStore.data = {
					'status' : 1,
					'message' : 'User added successfully'
				};
				next();
			});
	}).catch(function (e) {
        return next(e);
    });
}
