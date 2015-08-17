var enviornmentHandler = function(req, res, next) {
	var arguments = process.argv,
		env = arguments[2];
	//check enviorment
	switch(env) {
		case '-p' :
		case '-P' :
			return 'production';
			break;
		case '-q' :
			return 'qa';
			break;
		case '-d' :
		case '-D' :
		default   :
 			return 'development';
			break;
	}
	next();
}

exports.enviornmentHandler = enviornmentHandler;