

module.exports = {
	add : fnAddBlog,
	show : fnShowBlog,
	addComment : fnAddComment
};

function fnAddBlog (req,res,next) {
	var id;
	var blog = {
				title: req.query.title,
				body: req.query.body,
				published: req.query.published,
				author: req.session.userid
			};

	var query = dbconnection.query('INSERT INTO blog SET ?', blog, function (error, result) {
	  
	  if (error) {
			return next(error);
		}

		req.tempStore.data = {
			'status' : 1,
			'message' : 'Blog added successfully'
		};
		next();
	});
}

function fnShowBlog (req, res, next) {
	
	var intBlogId = req.params.id;

	dbconnection.query("SELECT * FROM blog WHERE id ='"+intBlogId+"'", function(error, arrResult, fields) {
		if (error) {
				return next(error);
		}
		console.log(arrResult[0]);

		req.tempStore.data = {
			'status' : 1,
			'message' :arrResult[0]
		};
		next();
	});
}

function fnAddComment (req,res,next) {

	var comment = {
					comment: req.query.body,
					userid: req.session.userid,
					blogid: req.query.id
			   };

	var query = dbconnection.query('INSERT INTO comment SET ?', comment, function (error, result) {
	  
	  if (error) {
			return next(error);
		}

		req.tempStore.data = {
			'status' : 1,
			'message' : 'Comment added successfully'
		};
		next();
	});
}	  	
	