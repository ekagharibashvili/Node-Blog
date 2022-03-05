const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const postRouter = require("./routes/postRoutes");

dotenv.config({
  path: "./config.env",
});

const app = express();

app.use(express.json({ limit: "10kb" }));

app.use("/post", postRouter);

app.use("/", (req, res, next) => {
  res.send("Use /post instead of /");
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
