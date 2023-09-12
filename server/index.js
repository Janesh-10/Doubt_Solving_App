const doubts = require("./data/doubts");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMidleware");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("API is running");
// });

app.get("/api/doubts", (req, res) => {
  res.json(doubts);
});

app.get("/api/doubts/:creator_id", (req, res) => {
  const doubt_by_creator = doubts.filter(
    (doubt) => doubt.doubt_creator_id === req.params.creator_id
  );

  res.send(doubt_by_creator);
});

app.use("/api/students", studentRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
