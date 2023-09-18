const express = require("express");
const {
  getDoubts,
  CreateDoubt,
  getDoubtById,
  UpdateDoubt,
  DeleteDoubt,
} = require("../controllers/doubtControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getDoubts);
router.route("/create").post(protect, CreateDoubt);
router
  .route("/:id")
  .get(getDoubtById)
  .put(protect, UpdateDoubt)
  .delete(protect, DeleteDoubt);

module.exports = router;
