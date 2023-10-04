const express = require("express");
const {
  registerTeacher,
  authTeacher,
  updateteacherProfile,
} = require("../controllers/teacherControllers");
const { protectTeacher } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(registerTeacher);
router.route("/login").post(authTeacher);
router.route("/profile").post(protectTeacher, updateteacherProfile);

module.exports = router;
