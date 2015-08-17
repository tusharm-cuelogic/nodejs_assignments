
module.exports = {
	signin : fnSignin,
	add: fnAdd
};

function fnSignin (req, res, next) {
	var strEmail = req.query.email,
		password = req.query.password;

	dbconnection.query("SELECT id FROM user WHERE email ='"+strEmail+"' AND password = '"+password+"'", function(error, arrDeviceResult, fields) {
		if (error) {
				return next(error);
		}
		
		if (arrDeviceResult[0] !="" && arrDeviceResult[0] != "undefined" && arrDeviceResult[0] != null) {
			var strDeviceResult = arrDeviceResult[0];
			UserId = strDeviceResult.id;

			if (UserId !="" && UserId != "undefined" && UserId != null) {
				
				req.tempStore.data = {
					'status' : 1,
					'message' : 'User authenticated successfully'
				};
				req.session.email = strEmail;
				req.session.userid = UserId;
			}
			next();
		} else {
				req.tempStore.data = {
				'status' : 0,
				'message' : 'Invalid email or password'
			};
			next();
		}
	});
}

/*Function fnAdd add new user details*/
function fnAdd (req, res, next) {

	var strFirstName = req.query.firstname,
		strLastName = req.query.lastname,
		strEmail = req.query.email,
		password = req.query.password;

	this.user = {
		firstname: strFirstName,
		lastname: strLastName,
		email: strEmail,
		password: password
	};
	
	//res.send("User added successfully");

	var query = dbconnection.query('INSERT INTO user SET ?', this.user, function (error, result) {
	  
	  if (error) {
			return next(error);
		}

		req.tempStore.data = {
			'status' : 1,
			'message' : 'User added successfully'
		};
		next();
	});
}
