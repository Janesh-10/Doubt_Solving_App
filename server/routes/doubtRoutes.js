const express = require("express");
const {
  getDoubts,
  CreateDoubt,
  getDoubtById,
  UpdateDoubt,
  DeleteDoubt,
  getDoubtsSubjects,
  UpdateDoubtSolved,
  UpdateDoubtUnsolved,
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
router.route("/solved/:id").put(protect, UpdateDoubtSolved);
router.route("/unsolved/:id").put(protect, UpdateDoubtUnsolved);

module.exports = router;
