var express = require('express'),
    router  = express.Router();

var validator = require('../validators/property'),
    controller = require('../controllers/property');

router.post('/property/add', [validator.validate, controller.add]);
router.post('/property/image/add', [validator.validateImg, controller.uploadimg]);
router.get('/property/image/form', [controller.imageform]);
router.put('/property/edit', [validator.validate, controller.edit]);
router.get('/properties', [controller.listing]);
router.get('/property/:property_id', [validator.validateId, controller.details]);

module.exports = router;