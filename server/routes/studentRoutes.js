const express = require("express");
const {
  registerStudent,
  authStudent,
} = require("../controllers/studentControllers");

const router = express.Router();

router.route("/").post(registerStudent);
router.route("/login").post(authStudent);

module.exports = router;
