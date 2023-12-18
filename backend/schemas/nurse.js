const mongoose = require("mongoose");

const nurseSchema = mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Gender: { type: String, required: true },
  ContactNumber: { type: String, required: true },
  EmailAddress: { type: String, required: true },
  Department: { type: String, required: true },
  Shifts: { type: String, required: true },
});

module.exports = mongoose.model("Nurse", nurseSchema);
