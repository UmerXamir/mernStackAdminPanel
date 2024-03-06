const cors = require("cors")
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log("err", err));
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend Server is running");
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
