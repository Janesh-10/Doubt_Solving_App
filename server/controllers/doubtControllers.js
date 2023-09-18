const asyncHandler = require("express-async-handler");
const Doubt = require("../models/doubtModels");

const getDoubts = asyncHandler(async (req, res) => {
  const doubts = await Doubt.find({ creator_id: req.student._id });
  res.json(doubts);
});

const CreateDoubt = asyncHandler(async (req, res) => {
  const { title, description, subject } = req.body;

  if (!title || !description || !subject) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const doubt = new Doubt({
      creator_id: req.student._id,
      title,
      description,
      subject,
    });

    const createdDoubt = await doubt.save();

    res.status(201).json(createdDoubt);
  }
});

const getDoubtById = asyncHandler(async (req, res) => {
  const doubt = await Doubt.findById(req.params.id);

  if (doubt) {
    res.json(doubt);
  } else {
    res.status(404).json({ message: "Doubt not found" });
  }
});

const UpdateDoubt = asyncHandler(async (req, res) => {
  const { title, description, subject } = req.body;

  const doubt = await Doubt.findById(req.params.id);

  if (doubt.creator_id.toString() !== req.student._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (doubt) {
    doubt.title = title;
    doubt.description = description;
    doubt.subject = subject;

    const updatedDoubt = await doubt.save();
    res.json(updatedDoubt);
  } else {
    res.status(404);
    throw new Error("Doubt not found");
  }
});

const DeleteDoubt = asyncHandler(async (req, res) => {
  const doubt = await Doubt.findById(req.params.id);

  if (doubt.creator_id.toString() !== req.student._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (doubt) {
    await doubt.deleteOne();
    res.json({ message: "Doubt Removed" });
  } else {
    res.status(404);
    throw new Error("Doubt not Found");
  }
});

module.exports = {
  getDoubts,
  CreateDoubt,
  getDoubtById,
  UpdateDoubt,
  DeleteDoubt,
};
