module.exports = {
	add : fnAddBlog,
	show : fnShowBlog,
	addComment : fnAddComment
}

/* fnAddBlog Check parameter are proper or not*/
function fnAddBlog (req,res,next) {

	if (req.session.email) {
		if ((typeof req.body.title === 'undefined') || (req.body.title == '')) {
				return next('Please enter title');
		} else if ((typeof req.body.body === 'undefined') || (req.body.body == '')) {
			return next('Please enter body');
		} else if ((typeof req.body.published === 'undefined') || (req.body.published == '')) {
			return next('Please enter published flag');
		}
	} else {
		return next('Please signin first to add blog');
	}
	next();
}

/* fnShowBlog Check parameter are proper or not*/
function fnShowBlog (req,res,next) {
	var intBlogId = req.params.id;
	if ((typeof intBlogId === 'undefined') || (intBlogId == '')) {
		return next('Provide proper blog id');
	}
	next();
}

function fnAddComment (req,res,next) {
	var strComment = req.body.body,
		intBlogId = req.body.id;

	if ((typeof strComment === 'undefined') || (strComment == '')) {
		return next('Comment body is required');
	}

	if ((typeof intBlogId === 'undefined') || (intBlogId == '')) {
		return next('Blog id is required');
	}
	next();
}