const express = require("express");
const {
  getDoubts,
  CreateDoubt,
  getDoubtById,
  UpdateDoubt,
  DeleteDoubt,
  getDoubtsSubjects,
} = require("../controllers/doubtControllers");
const { protect, protectTeacher } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getDoubts);
router.route("/teacherdoubts").get(protectTeacher, getDoubtsSubjects);
router.route("/create").post(protect, CreateDoubt);
router
  .route("/:id")
  .get(getDoubtById)
  .put(protect, UpdateDoubt)
  .delete(protect, DeleteDoubt);

module.exports = router;
