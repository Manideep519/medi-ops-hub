const Pharmacist = require("../schemas/pharmacist");

const createPharmacist = async (req, res, next) => {
  console.log(req.body);
  try {
    const newPharmacist = new Pharmacist({
      MedicationName: req.body.MedicationName,
      QuantityInStock: req.body.QuantityInStock,
      ExpiryDate: req.body.ExpiryDate,
      Manufacturer: req.body.Manufacturer,
      PricePerUnit: req.body.PricePerUnit,
    });

    const result = await newPharmacist.save();

    res.json(result);
  } catch (error) {
    res.status(error).json(error.message);
  }
};

const getAllPharmacists = async (req, res, next) => {
  try {
    const pharmacists = await Pharmacist.find().exec();
    res.json(pharmacists);
  } catch (error) {
    res.status(error).json(error.message);
  }
};

exports.getAllPharmacists = getAllPharmacists;
exports.createPharmacist = createPharmacist;
