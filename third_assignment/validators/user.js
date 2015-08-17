

//Define variable
regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Call the method
module.exports = {
	signin : fnValidateSignin,
	add : fnAddValidate
}

function fnValidateSignin (req,res,next) {
	var strEmail = '';
		if (req.query.email) {
			strEmail = req.query.email.trim();
		}

	if ((typeof strEmail === 'undefined') || (strEmail == '') || !regex.test(strEmail)) {

		req.tempStore.data = {
			'status' : 0,
			'message' : 'Please enter valid Email'
		};
		next();

	} else if ((typeof req.query.password === 'undefined') || (req.query.password == '')) {
		
		req.tempStore.data = {
			'status' : 0,
			'message' : 'Please enter valid Email'
		};
		next();
	}
	next();
}

function fnAddValidate (req,res,next) {
	
	var strFirstName = req.query.firstname,
		strLastName = req.query.lastname,
		strEmailCheck = req.query.email,
		password = req.query.password;

	if ((typeof strFirstName === 'undefined') || (strFirstName == '')) {
		return next('Please enter first name');
	} else if ((typeof strLastName === 'undefined') || (strLastName == '')) {
		return next('Please enter last name');
	} else	if ((typeof strEmailCheck === 'undefined') || (strEmailCheck == '') || !regex.test(strEmailCheck)) {
		return next('Please enter valid Email');
	} else if ((typeof password === 'undefined') || (password == '')) {
		return next('Password is required');
	}

	fnCheckEmailExistOrNot(strEmailCheck,req,res,next,function(err) {
		if (err) {
			return next(err);
		}
		next();
	});
}

/* function to check email alredy exist or not*/
function fnCheckEmailExistOrNot (strEmail,req,res,next) {
	
	console.log(strEmail);
	dbconnection.query("SELECT id FROM user WHERE email ='"+strEmail+"'", function(error, arrDeviceResult, fields) {
		if (error) {
			return next(error);
		}
		
		if (arrDeviceResult[0] !="" && arrDeviceResult[0] != "undefined" && arrDeviceResult[0] != null) {
			var strDeviceResult = arrDeviceResult[0];
			UserId = strDeviceResult.id;

			console.log(UserId);
			if (UserId !="" && UserId != "undefined" && UserId != null) {
				
				res.send('Email is already exists');
				return next("Email is already exists");
			}
		}
		next();
	});
}

