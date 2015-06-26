var BlogSchema = require('../schemas/blog.js'),
	UserSchema = require('../schemas/user.js'),
	ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
	add : fnAddBlog,
	show : fnShowBlog,
	addComment : fnAddComment
};

function fnAddBlog (req,res,next) {
	var id;
	UserSchema.findOne({email:req.session.email}, function(err,user) {
		if (user) {
			var blog = {
				title: req.body.title,
				body: req.body.body,
				published: req.body.published,
				author: user._id
			};

			var Addblog = new BlogSchema(blog);
		  		Addblog.save(function(err,res) {
					if (err) {
						return next(err);
					}
					req.tempStore.data = {
						'status' : 1,
						'message' : 'Blog added successfully'
					};
					next();
				});
	    }
	});
}

function fnShowBlog (req, res, next) {
	BlogSchema.findOne({_id: new ObjectId(req.params.id)}).populate('author','firstname lastname').exec(function(err, blog) {
		if (err) {
			return next(err);
		}
		req.tempStore.data = {
			'status' : 1,
			'message' :blog
		};
		next();
	});
}


function fnAddComment (req,res,next) {
	BlogSchema.findOne({_id: new ObjectId(req.body.id)})
	.exec(function(err, blog) {
		if (err) {
			return next(err);
		}
		blog.comments.push({body: req.body.body});
	  	blog.save(function(err, result) {

	  		req.tempStore.data = {
					'status' : 1,
					'message' : 'comment added successfully'
				};
				next();
	  	});
	});
}