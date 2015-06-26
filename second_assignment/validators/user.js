// Include user schema file and bcrypt file
var userSchema = require('../schemas/user.js'),
//Define variable
regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Call the method
module.exports = {
	signin : fnValidateSignin,
	add : fnAddValidate
}

function fnValidateSignin (req,res,next) {
	var strEmail = '';
		if (req.body.email) {
			strEmail = req.body.email.trim();
		}

	if ((typeof strEmail === 'undefined') || (strEmail == '') || !regex.test(strEmail)) {
		return next('Please enter valid Email');
	} else if ((typeof req.body.password === 'undefined') || (req.body.password == '')) {
		return next('Password is required');
	}
	next();
}

function fnAddValidate (req,res,next) {
	var strFirstName = req.body.firstname.trim(),
		strLastName = req.body.lastname.trim(),
		strEmailCheck = req.body.email.trim(),
		password = req.body.password;

	if ((typeof strFirstName === 'undefined') || (strFirstName == '')) {
		return next('Please enter first name');
	} else if ((typeof strLastName === 'undefined') || (strLastName == '')) {
		return next('Please enter last name');
	} else	if ((typeof strEmailCheck === 'undefined') || (strEmailCheck == '') || !regex.test(strEmailCheck)) {
		return next('Please enter valid Email');
	} else if ((typeof password === 'undefined') || (password == '')) {
		return next('Password is required');
	}
	fnCheckEmailExistOrNot(strEmailCheck,function(err) {
		if (err) {
			return next(err);
		}
		next();
	});

}
/* function to check email alredy exist or not*/
function fnCheckEmailExistOrNot (strEmail,cb) {
	userSchema.count({'email' : strEmail}, function(err,count) {
		if (count > 0) {
			cb('email already exists');
			return;
		}

		cb();
	});
}