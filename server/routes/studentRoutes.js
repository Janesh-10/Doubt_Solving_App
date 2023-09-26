const express = require("express");
const {
  registerStudent,
  authStudent,
  updateStudentProfile,
} = require("../controllers/studentControllers");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(registerStudent);
router.route("/login").post(authStudent);
router.route("/profile").post(protect, updateStudentProfile);

module.exports = router;
