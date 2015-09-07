module.exports = {
	validate : Validateproperty,
	validateImg: ValidateImage,
	validateId: ValidateId
}

function Validateproperty (req,res,next) {

	var propertyTitle = req.body.title,
	    address      = req.body.address,
	    zipcode      = req.body.zipcode,
	    squarefeet   = req.body.squarefeet,
	    price        = req.body.price,
	    description  = req.body.description,
	    type  = req.body.type;
	
	if (propertyTitle == '') {
			return next('Please enter property title');
	} else if (address == '') {
		return next('Please enter address');
	} else if (zipcode == '') {
		return next('Please enter zipcode');
	}
	next();
}

/* fnShowBlog Check parameter are proper or not*/
function ValidateId (req,res,next) {
	
	var propertyId = req.params.property_id;
	if (propertyId == '') {
		return next('Property Id is missing');
	}
	next();
}

function ValidateImage(req,res,next) {
	console.log(req);
	next();
}