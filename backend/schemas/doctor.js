const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Gender: { type: String, required: true },
  ContactNumber: { type: String, required: true },
  EmailAddress: { type: String, required: true },
  Specialization: { type: String, required: true },
  HospitalAffiliation: { type: String, required: true },
  AvailableDays: { type: String, required: true },
  AvailableTimes: { type: String, required: true },
  Education: { type: String, required: true },
  Experience: { type: String, required: true },
  Certifications: { type: String, required: true },
  ConsultationFee: { type: String, required: true },
});

module.exports = mongoose.model("Doctor", doctorSchema);
