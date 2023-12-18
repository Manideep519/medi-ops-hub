const Nurse = require("../schemas/nurse");

const createNurse = async (req, res, next) => {
  try {
    const newNurse = new Nurse({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Gender: req.body.Gender,
      ContactNumber: req.body.ContactNumber,
      EmailAddress: req.body.EmailAddress,
      Department: req.body.Department,
      Shifts: req.body.Shifts,
    });

    const result = await newNurse.save();

    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getAllNurses = async (req, res, next) => {
  try {
    const nurses = await Nurse.find().exec();
    res.json(nurses);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getAllNurses = getAllNurses;
exports.createNurse = createNurse;
