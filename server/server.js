const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fs = require("fs");
dotenv.config();
// const userRouter = require("./routes/user.js");

const app = express();

const origins = ["http://localhost:5173", "http://localhost:5175"];

const corsOptionsDelegate = (req, cb) => {
  let options;
  if (origins.indexOf(req.header("Origin")) !== -1) {
    options = {
      origin: true,
    };
  } else {
    options = {
      origin: "Not allowed by CORS",
    };
  }
  cb(null, options);
};
const corsOption =
  process.env.NODE_ENV === "development" ? null : corsOptionsDelegate;

app.use(express.json({ extended: false }));
app.use(morgan("dev"));
app.use(cors(corsOption));

// app.use("/api/v1/users", userRouter);
fs.readdirSync("./routes").map((r) => {
  app.use("/api/v1", require(`./routes/${r}`));
});

console.log(process.env.NODE_ENV);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Err connecting to DB");
  });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
