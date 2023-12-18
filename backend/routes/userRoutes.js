const express = require("express");

const { check } = require("express-validator");

const userControllers = require("../controllers/userController");
const router = express.Router();

router.post(
  "/register",
  [check("email").notEmpty(), check("password").notEmpty()],
  userControllers.createUser
);
router.post("/login", userControllers.loginUser);

module.exports = router;
