const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const commentRouter = require("./routes/commentRoutes");
const likeRouter = require("./routes/likeRoutes");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");

//for defining enviroment variables
dotenv.config({
  path: "./config.env",
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();
//using security libraries

// protect app from DDoS attacks
app.use(limiter);

// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());

// sanitize user input coming from POST body, GET queries, and url params.
app.use(xss());

// protect against HTTP Parameter Pollution attacks
app.use(hpp());

// middleware - function that can modify incoming data
// middle -- between the request and the response
// to put body object in request (req.body to be available)
//Body parser
//* when we have body larger than 10kb basically not be accepted
app.set("view engine", "ejs");

// client-side for signup
app.get("/user/signup", (req, res) => {
  res.render("upload");
});

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
