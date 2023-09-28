const express = require("express");
const {
  registerTeacher,
  authTeacher,
} = require("../controllers/teacherControllers");

const router = express.Router();

router.route("/").post(registerTeacher);
router.route("/login").post(authTeacher);

module.exports = router;
