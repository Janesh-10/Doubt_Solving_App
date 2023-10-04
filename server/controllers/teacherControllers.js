const asyncHandler = require("express-async-handler");
const Teacher = require("../models/teacherModels");
const Post = require("../models/postModels");
const generateToken = require("../utils/generateToken");

const registerTeacher = asyncHandler(async (req, res) => {
  const { name, email, password, pic, subjects } = req.body;

  const teacherExists = await Teacher.findOne({ email });

  if (teacherExists) {
    res.status(400);
    throw new Error("Email already registered");
  }

  const teacher = await Teacher.create({
    name,
    email,
    password,
    pic,
    subjects,
  });

  if (teacher) {
    res.status(201).json({
      _id: teacher._id,
      name: teacher.name,
      email: teacher.email,
      isAdmin: teacher.isAdmin,
      pic: teacher.pic,
      subjects: teacher.subjects,
      token: generateToken(teacher._id),
    });
  } else {
    res.status(400);
    throw new Error("An unexpected error occured");
  }
});

const authTeacher = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Teacher.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      subjects: user.subjects,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
});

const updateteacherProfile = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.teacher._id);

  if (teacher) {
    const pre_email = teacher.email;
    teacher.name = req.body.name || teacher.name;
    teacher.email = req.body.email || teacher.email;
    teacher.pic = req.body.pic || teacher.pic;
    teacher.subjects = req.body.subjects || teacher.subjects;
    if (req.body.password) {
      teacher.password = req.body.password;
    }

    const updatedTeacher = await teacher.save();

    const posts = Post.find();

    const filter = { creator_email: pre_email };

    const updatePost = {
      $set: {
        creator_email: teacher.email,
      },
    };

    const result = await posts.updateMany(filter, updatePost);

    res.json({
      _id: updatedTeacher._id,
      name: updatedTeacher.name,
      email: updatedTeacher.email,
      pic: updatedTeacher.pic,
      isAdmin: updatedTeacher.isAdmin,
      subjects: updatedTeacher.subjects,
      token: generateToken(updatedTeacher._id),
    });
  } else {
    res.status(404);
    throw new Error("Teacher Not Found");
  }
});

module.exports = { registerTeacher, authTeacher, updateteacherProfile };
