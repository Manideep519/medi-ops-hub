const express = require("express");

const nurseController = require("../controllers/nurseController");
const { authenticateJWT } = require("../middlewares/jwtAuth");
const router = express.Router();

router.get("/all", nurseController.getAllNurses);
router.post("/create", authenticateJWT, nurseController.createNurse);

module.exports = router;
