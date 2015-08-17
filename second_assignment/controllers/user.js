
module.exports = {
	signin : fnSignin,
	add: fnAdd
};

function fnSignin (req, res, next) {
	var strEmail = req.query.email,
		password = req.query.password;

		if (strEmail == "admin@gmail.com" && password == "1234") {
			res.send("Login successfully");
		} else {
			res.send("Authentication failed");
		}
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
	res.send("User added successfully");
}
