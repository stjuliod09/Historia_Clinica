const express = require('express');
const router = express.Router();
const personController = require('./person.controller');

router.post('/create', personController.create);
router.get('/get/:id', personController.getId);
router.get('/getAll', personController.getAll);
router.put('/update/:id', personController.update);
router.post('/previoushistory/create', personController.createPreviousHistory);
router.post('/address/create', personController.createAddress);
router.post('/contact/create', personController.createContact);
router.post('/personid/create', personController.createPersonIdentifier);
router.post('/idtype/create', personController.createContact);
router.post('/users/create', personController.createContact);

module.exports = router;
