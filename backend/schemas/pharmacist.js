const mongoose = require("mongoose");

const pharmacistSchema = mongoose.Schema({
  MedicationName: { type: String, required: true },
  QuantityInStock: { type: String, required: true },
  ExpiryDate: { type: String, required: true },
  Manufacturer: { type: String, required: true },
  PricePerUnit: { type: String, required: true },
});

module.exports = mongoose.model("Pharmacist", pharmacistSchema);
