

module.exports = {
	add : AddEditproperty,
	listing : PropertyListing,
	edit : AddEditproperty,
	details : showPropertyDetails,
	uploadimg: UploadImage,
	imageform: imageFormHtml
};

function AddEditproperty (req,res,next) {
	
	var property_id = req.body.property_id;
	var property = {
				title: req.body.title,
	    		address: req.body.address,
	    		zipcode: req.body.zipcode,
	    		squarfeet: req.body.sf,
	    		price: req.body.price,
	    		description: req.body.description,
	    		property_type: req.body.property_type
			};

	var successMessage = "";

	if (property_id >0) {

		var query = dbconnection.query('UPDATE property SET ? WHERE property_id = ?', [property, property_id], function (error, result) {
	  
		  if (error) {
				return next(error);
			}
		});

		successMessage = "Your property has been updated."; 
	} else {

		var query = dbconnection.query('INSERT INTO property SET ?', property, function (error, result) {
	  
		  if (error) {
				return next(error);
			}
		});
		successMessage = "Your property has been added.";
	}

	req.tempStore.data = {
		'status' : 1,
		'data' :property,
		'message': successMessage
	};
	next();
}  	
	
function PropertyListing (req,res,next) {
	
	var queryLimit = 1; 
	    pageNumber = (isNaN(req.query.page) == true || req.query.page == "") ? 1 : req.query.page,
	    startOffset = parseInt((pageNumber - 1) * queryLimit);
	
	dbconnection.query("SELECT title, address, squarfeet,price,property_id FROM property LIMIT "+startOffset+","+queryLimit, function(error, Result, fields) {
		if (error) {
				return next(error);
		}

		req.tempStore.data = {
			'Output' :Result
		};
		next();
	});
}

function showPropertyDetails(req,res,next) {
	
	var property_id = req.params.property_id

	dbconnection.query("SELECT title, address, squarfeet, price FROM property WHERE property_id ='"+property_id+"'", function(error, Result, fields) {
		if (error) {
				return next(error);
		}

		req.tempStore.data = {
			'Output' :Result[0]
		};
		next();
	});
}

function UploadImage(req,res,next) {
	next();
}

function imageFormHtml (req,res,reply) {
 
 //next();
 reply(
    '<form action="/property/image/add" method="post" enctype="multipart/form-data">' +
    '<input type="file" name="fileUpload">' +
    '<input type="submit" value="Upload">' +
    '</form>'
  );
}
