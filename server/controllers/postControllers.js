const asyncHandler = require("express-async-handler");
const Post = require("../models/postModels");

const CreateQuery = asyncHandler(async (req, res) => {
  const { solution } = req.body;

  if (!solution) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const post = new Post({
      solution,
      doubt_id: req.params.id,
      creator_email: req.student.email,
    });

    const createdPost = await post.save();

    res.status(201).json(createdPost);
  }
});

const CreateSolution = asyncHandler(async (req, res) => {
  const { solution } = req.body;

  if (!solution) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const post = new Post({
      solution,
      doubt_id: req.params.id,
      creator_email: req.teacher.email,
    });

    const createdPost = await post.save();

    res.status(201).json(createdPost);
  }
});

const ViewPosts = asyncHandler(async (req, res) => {
  const doubt_id = req.params.id;

  const posts = await Post.find({ doubt_id: doubt_id });

  res.json(posts);
});

module.exports = {
  CreateQuery,
  CreateSolution,
  ViewPosts,
};
