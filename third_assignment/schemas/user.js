var conMongoose = require('mongoose');

module.exports = conMongoose.model('User', {
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password:  { type: String, required: true},
	hashpassword: String,
	createddate: { type : Date, default: Date.now }
});
