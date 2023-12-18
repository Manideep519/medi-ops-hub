const Doctor = require("../schemas/doctor");

const createDoctor = async (req, res, next) => {
  console.log(req.body);
  try {
    const newDoctor = new Doctor({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Gender: req.body.Gender,
      ContactNumber: req.body.ContactNumber,
      EmailAddress: req.body.EmailAddress,
      Specialization: req.body.Specialization,
      HospitalAffiliation: req.body.HospitalAffiliation,
      AvailableDays: req.body.AvailableDays,
      AvailableTimes: req.body.AvailableTimes,
      Education: req.body.Education,
      Experience: req.body.Experience,
      Certifications: req.body.Certifications,
      ConsultationFee: req.body.ConsultationFee,
    });

    const result = await newDoctor.save();

    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
    error;
  }
};

const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find().exec();
    res.json(doctors);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getAllDoctors = getAllDoctors;
exports.createDoctor = createDoctor;
