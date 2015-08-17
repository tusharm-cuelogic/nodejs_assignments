

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
				published: req.query.published
				//author: user._id
			};

	res.send("Blog added successfully");
	req.tempStore.data = {
		'status' : 1,
		'message' :blog
	};
	next();
}

function fnShowBlog (req, res, next) {
	var blog = {
				title: 'Test Blog 1',
				body: 'Blog Body/Description',
				published: 'yes',
				author: '2'
			};
	
	req.tempStore.data = {
		'status' : 1,
		'message' :blog
	};
	next();
}

function fnAddComment (req,res,next) {

	//blog.comments.push({body: req.query.body});
	var blog = {
				comments: req.query.body
			};

	res.send("Comment added successfully");
	req.tempStore.data = {
		'status' : 1,
		'message' : 'comment added successfully',
		'comment' :blog
	};
	next();
}	  	
	