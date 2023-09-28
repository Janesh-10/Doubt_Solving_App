const asyncHandler = require("express-async-handler");
const Teacher = require("../models/teacherModels");
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

module.exports = { registerTeacher, authTeacher };
