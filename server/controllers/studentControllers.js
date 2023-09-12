const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModels");
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

module.exports = { registerStudent, authStudent };
