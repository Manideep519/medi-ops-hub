const express = require("express");

const patientController = require("../controllers/patientController");
const { authenticateJWT } = require("../middlewares/jwtAuth");
const router = express.Router();

router.get("/all", patientController.getAllPatients);
router.post("/create", authenticateJWT, patientController.createPatient);

module.exports = router;
