var express = require('express');
var router = express.Router();

//Get validators and controllerd file
var validator = require('../validators/user'),
    controller = require('../controllers/user');
    

router.post('/signin', [validator.signin, controller.signin]);
router.post('/signup', [validator.add, controller.add]);


module.exports = router;
