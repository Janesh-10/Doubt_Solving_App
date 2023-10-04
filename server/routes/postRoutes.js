const express = require("express");
const { protect, protectTeacher } = require("../middlewares/authMiddleware");
const {
  CreateQuery,
  CreateSolution,
  ViewPosts,
} = require("../controllers/postControllers");

const router = express.Router();

router.route("/createquery/:id").post(protect, CreateQuery);
router.route("/createsolution/:id").post(protectTeacher, CreateSolution);
router.route("/viewposts/:id").get(ViewPosts);

module.exports = router;
