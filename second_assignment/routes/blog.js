var express = require('express');
var router = express.Router();

var validator = require('../validators/blog'),
    controller = require('../controllers/blog');

router.post('/addblog', [validator.add, controller.add]);
router.get('/show/:id', [validator.show, controller.show]);
router.post('/addcomment', [validator.addComment, controller.addComment]);

module.exports = router;