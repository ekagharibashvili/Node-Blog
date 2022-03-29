const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const commentRouter = require("./routes/commentRoutes");
const likeRouter = require("./routes/likeRoutes");

//for defining enviroment variables
dotenv.config({
  path: "./config.env",
});

const app = express();
// middleware - function that can modify incoming data
// middle -- between the request and the response
// to put body object in request (req.body to be available)
//Body parser
//* when we have body larger than 10kb basically not be accepted

app.use(express.json({ limit: "10kb" }));

app.use("/post", postRouter);
// app.use('/user', userRouter)

// route for users
app.use("/user", userRouter);
// route for comment
app.use("/comment", commentRouter);
// route for like
app.use("/like", likeRouter);

app.use("/", (req, res, next) => {
  res.send("Use /post instead of /");
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

async function bootstrap() {
  try {
    await mongoose.connect(DB);
    app.listen(3000, console.log("server is running..."));
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
