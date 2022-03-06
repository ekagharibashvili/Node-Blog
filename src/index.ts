import express, { Request, Response, Application } from "express";
import env from "process";
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const postRouter = require("./routes/postRoutes");

dotenv.config({
  path: "./config.env",
});

// const app = express()
const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(express.json({ limit: "10kb" }));

app.use("/post", postRouter);

app.use("/", (req: Request, res: Response): void => {
  res.send("Use /post instead of /");
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

app.listen(PORT, (): void => {
  console.log(`App running on port ${PORT}...`);
});
