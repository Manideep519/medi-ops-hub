const express = require("express");

const pharmacistController = require("../controllers/pharmacistController");
const { authenticateJWT } = require("../middlewares/jwtAuth");
const router = express.Router();

router.get("/all", pharmacistController.getAllPharmacists);
router.post("/create", authenticateJWT, pharmacistController.createPharmacist);

module.exports = router;
