const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModels");
const Post = require("../models/postModels");
const Doubt = require("../models/doubtModels");
const generateToken = require("../utils/generateToken");

const registerStudent = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const studentExists = await Student.findOne({ email });

  if (studentExists) {
    res.status(400);
    throw new Error("Email already registered");
  }

  const student = await Student.create({
    name,
    email,
    password,
    pic,
  });

  if (student) {
    res.status(201).json({
      _id: student._id,
      name: student.name,
      email: student.email,
      isAdmin: student.isAdmin,
      pic: student.pic,
      token: generateToken(student._id),
    });
  } else {
    res.status(400);
    throw new Error("An unexpected error occured");
  }
});

const authStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Student.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
});

const updateStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.student._id);

  if (student) {
    const pre_email = student.email;
    student.name = req.body.name || student.name;
    student.email = req.body.email || student.email;
    student.pic = req.body.pic || student.pic;
    if (req.body.password) {
      student.password = req.body.password;
    }

    const updatedStudent = await student.save();

    const posts = Post.find();

    const filter = { creator_email: pre_email };

    const updatePost = {
      $set: {
        creator_email: student.email,
      },
    };

    const result = await posts.updateMany(filter, updatePost);

    const doubts = Doubt.find();

    const doubtresult = await doubts.updateMany(filter, updatePost);

    res.json({
      _id: updatedStudent._id,
      name: updatedStudent.name,
      email: updatedStudent.email,
      pic: updatedStudent.pic,
      isAdmin: updatedStudent.isAdmin,
      token: generateToken(updatedStudent._id),
    });
  } else {
    res.status(404);
    throw new Error("Student Not Found");
  }
});

module.exports = { registerStudent, authStudent, updateStudentProfile };
