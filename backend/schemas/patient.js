const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  DateOfBirth: { type: String, required: true },
  Gender: { type: String, required: true },
  ContactNumber: { type: String, required: true },
  EmailAddress: { type: String, required: true },
  Address: { type: String, required: true },
  EmergencyContactName: { type: String, required: true },
  EmergencyContactNumber: { type: String, required: true },
  InsuranceInformation: { type: String, required: true },
  MedicalHistory: { type: String, required: true },
  Symptoms: { type: String, required: true },
  CurrentMedications: { type: String, required: true },
  Appointments: { type: String, required: true },
});

module.exports = mongoose.model("Patient", patientSchema);
