const express = require("express");

const doctorController = require("../controllers/doctorController");
const { authenticateJWT } = require("../middlewares/jwtAuth");
const router = express.Router();

router.get("/all", doctorController.getAllDoctors);
router.post("/create", authenticateJWT, doctorController.createDoctor);

module.exports = router;
