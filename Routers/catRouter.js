
var express = require("express");
var router = express.Router();
var catController = require("../Controllers/catController");

router.get('/', catController.getAllCats);

router.post('/', catController.addCats);

module.exports = router;