const express = require("express");
const router = express.Router();
const personController = require("./person.controller");

router.post("/create", personController.create);
router.get("/:id", personController.getId);
router.get("/getAll", personController.getAll);
router.put("/update/:id", personController.update);

module.exports = router;