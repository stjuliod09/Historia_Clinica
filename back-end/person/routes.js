const express = require("express");
const router = express.Router();
const personController = require("./person.controller");

router.post("/create", personController.create);
router.get("/get/:id", personController.getId);
router.get("/getAll", personController.getAll);
router.put("/update/:id", personController.update);
router.post("/previoushistory/create", personController.createPreviousHistory);

module.exports = router;
