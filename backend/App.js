const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const nurseRoutes = require("./routes//nurseRoutes");
const pharmacistRoutes = require("./routes/pharmacistRoutes");
const cors = require("cors");
require("dotenv").config();
const app = express();

const port = 3001;
const url =
  "mongodb+srv://anusha85:xWX494rLqJbVRXtp@cluster0.fsftrcj.mongodb.net/MediOpsHub?retryWrites=true&w=majority";

app.use(cors());
app.use(bodyParser.json());
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});
app.use("/api/users", userRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/nurse", nurseRoutes);
app.use("/api/pharmacist", pharmacistRoutes);

mongoose
  .connect(url)
  .then(() => {
    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
    console.log("Connected to databaase!");
  })
  .catch((e) => {
    console.log("Connection failed!", e);
  });

exports.app = app;
