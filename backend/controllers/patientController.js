const Patient = require("../schemas/patient");

const createPatient = async (req, res, next) => {
  console.log(req.body);
  try {
    const newPatient = new Patient({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      DateOfBirth: req.body.DateOfBirth,
      Gender: req.body.Gender,
      ContactNumber: req.body.ContactNumber,
      EmailAddress: req.body.EmailAddress,
      Address: req.body.Address,
      EmergencyContactName: req.body.EmergencyContactName,
      EmergencyContactNumber: req.body.EmergencyContactNumber,
      InsuranceInformation: req.body.InsuranceInformation,
      MedicalHistory: req.body.MedicalHistory,
      Symptoms: req.body.Symptoms,
      CurrentMedications: req.body.CurrentMedications,
      Appointments: req.body.Appointments,
    });

    const result = await newPatient.save();

    res.json(result);
  } catch (error) {
    res.status(error).json(error.message);
  }
};

const getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find().exec();
    res.json(patients);
  } catch (error) {
    res.status(error).json(error.message);
  }
};

exports.getAllPatients = getAllPatients;
exports.createPatient = createPatient;
