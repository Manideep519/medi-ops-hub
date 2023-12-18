import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
} from '@chakra-ui/react';

import React, { useContext, useEffect, useRef, useState } from 'react';

import { MdAddCircle } from 'react-icons/md';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import CustomModal from '../CustomModal';
import { checkObjectPropsIsEmpty } from '../../helper/utils';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../../App';
import { FlexFormContainer } from '../../helper/components';

// const patientsData = [
//   {
//     PatientID: 'P001',
//     FirstName: 'John',
//     LastName: 'Doe',
//     DateOfBirth: '1985-05-15',
//     Gender: 'Male',
//     ContactNumber: '+1 (555) 555-5555',
//     EmailAddress: 'john.doe@example.com',
//     Address: '123 Main Street, Cityville, USA',
//     EmergencyContactName: 'Jane Doe',
//     EmergencyContactNumber: '+1 (555) 555-5556',
//     InsuranceInformation: 'ABC Insurance, Policy: 12345',
//     MedicalHistory: 'Hypertension, Diabetes',
//     Symptoms: 'Headache, Fatigue',
//     CurrentMedications: 'Metoprolol, Insulin',
//     Appointments: [
//       {
//         Doctor: 'Dr. Smith',
//         Date: '2023-10-20',
//         Time: '10:00 AM',
//         Department: 'Cardiology',
//       },
//       {
//         Doctor: 'Dr. Johnson',
//         Date: '2023-10-25',
//         Time: '02:30 PM',
//         Department: 'Dermatology',
//       },
//     ],
//   },
//   {
//     PatientID: 'P002',
//     FirstName: 'Jane',
//     LastName: 'Smith',
//     DateOfBirth: '1990-09-20',
//     Gender: 'Female',
//     ContactNumber: '+1 (555) 555-5557',
//     EmailAddress: 'jane.smith@example.com',
//     Address: '456 Oak Street, Townsville, USA',
//     EmergencyContactName: 'John Smith',
//     EmergencyContactNumber: '+1 (555) 555-5558',
//     InsuranceInformation: 'XYZ Insurance, Policy: 67890',
//     MedicalHistory: 'Asthma',
//     Symptoms: 'Shortness of breath, Wheezing',
//     CurrentMedications: 'Albuterol',
//     Appointments: [
//       {
//         Doctor: 'Dr. Davis',
//         Date: '2023-10-21',
//         Time: '11:30 AM',
//         Department: 'Pulmonology',
//       },
//       {
//         Doctor: 'Dr. Brown',
//         Date: '2023-10-26',
//         Time: '03:00 PM',
//         Department: 'Allergy & Immunology',
//       },
//     ],
//   },
//   {
//     PatientID: 'P003',
//     FirstName: 'Sarah',
//     LastName: 'Johnson',
//     DateOfBirth: '1978-08-25',
//     Gender: 'Female',
//     ContactNumber: '+1 (555) 555-5559',
//     EmailAddress: 'sarah.johnson@example.com',
//     Address: '789 Pine Avenue, Villagetown, USA',
//     EmergencyContactName: 'Michael Johnson',
//     EmergencyContactNumber: '+1 (555) 555-5560',
//     InsuranceInformation: 'DEF Insurance, Policy: 54321',
//     MedicalHistory: 'None',
//     Symptoms: 'Fever, Sore Throat',
//     CurrentMedications: 'Acetaminophen',
//     Appointments: [
//       {
//         Doctor: 'Dr. Adams',
//         Date: '2023-10-22',
//         Time: '09:30 AM',
//         Department: 'Internal Medicine',
//       },
//       {
//         Doctor: 'Dr. Lee',
//         Date: '2023-10-27',
//         Time: '01:00 PM',
//         Department: 'Family Medicine',
//       },
//     ],
//   },
//   {
//     PatientID: 'P004',
//     FirstName: 'Michael',
//     LastName: 'Brown',
//     DateOfBirth: '1965-11-12',
//     Gender: 'Male',
//     ContactNumber: '+1 (555) 555-5561',
//     EmailAddress: 'michael.brown@example.com',
//     Address: '101 Elm Lane, Hamletville, USA',
//     EmergencyContactName: 'Mary Brown',
//     EmergencyContactNumber: '+1 (555) 555-5562',
//     InsuranceInformation: 'GHI Insurance, Policy: 24680',
//     MedicalHistory: 'High Cholesterol',
//     Symptoms: 'Chest Pain, Shortness of Breath',
//     CurrentMedications: 'Atorvastatin',
//     Appointments: [
//       {
//         Doctor: 'Dr. Green',
//         Date: '2023-10-23',
//         Time: '10:45 AM',
//         Department: 'Cardiology',
//       },
//       {
//         Doctor: 'Dr. Rodriguez',
//         Date: '2023-10-28',
//         Time: '02:45 PM',
//         Department: 'Endocrinology',
//       },
//     ],
//   },
//   {
//     PatientID: 'P005',
//     FirstName: 'Emily',
//     LastName: 'Davis',
//     DateOfBirth: '1995-04-10',
//     Gender: 'Female',
//     ContactNumber: '+1 (555) 555-5563',
//     EmailAddress: 'emily.davis@example.com',
//     Address: '202 Maple Drive, Riverside, USA',
//     EmergencyContactName: 'Michael Davis',
//     EmergencyContactNumber: '+1 (555) 555-5564',
//     InsuranceInformation: 'LMN Insurance, Policy: 13579',
//     MedicalHistory: 'None',
//     Symptoms: 'Fever, Cough',
//     CurrentMedications: 'Ibuprofen',
//     Appointments: [
//       {
//         Doctor: 'Dr. Evans',
//         Date: '2023-10-24',
//         Time: '09:00 AM',
//         Department: 'Internal Medicine',
//       },
//       {
//         Doctor: 'Dr. Turner',
//         Date: '2023-10-29',
//         Time: '01:15 PM',
//         Department: 'Family Medicine',
//       },
//     ],
//   },
//   {
//     PatientID: 'P006',
//     FirstName: 'William',
//     LastName: 'Taylor',
//     DateOfBirth: '1970-07-18',
//     Gender: 'Male',
//     ContactNumber: '+1 (555) 555-5565',
//     EmailAddress: 'william.taylor@example.com',
//     Address: '303 Cedar Lane, Greenvale, USA',
//     EmergencyContactName: 'Susan Taylor',
//     EmergencyContactNumber: '+1 (555) 555-5566',
//     InsuranceInformation: 'OPQ Insurance, Policy: 97531',
//     MedicalHistory: 'High Blood Pressure',
//     Symptoms: 'Dizziness, Fatigue',
//     CurrentMedications: 'Lisinopril',
//     Appointments: [
//       {
//         Doctor: 'Dr. King',
//         Date: '2023-10-25',
//         Time: '10:30 AM',
//         Department: 'Cardiology',
//       },
//       {
//         Doctor: 'Dr. White',
//         Date: '2023-10-30',
//         Time: '02:00 PM',
//         Department: 'Endocrinology',
//       },
//     ],
//   },
//   {
//     PatientID: 'P007',
//     FirstName: 'Olivia',
//     LastName: 'Anderson',
//     DateOfBirth: '1988-12-03',
//     Gender: 'Female',
//     ContactNumber: '+1 (555) 555-5567',
//     EmailAddress: 'olivia.anderson@example.com',
//     Address: '404 Birch Street, Lakeside, USA',
//     EmergencyContactName: 'Daniel Anderson',
//     EmergencyContactNumber: '+1 (555) 555-5568',
//     InsuranceInformation: 'RST Insurance, Policy: 86420',
//     MedicalHistory: 'Asthma',
//     Symptoms: 'Wheezing, Shortness of breath',
//     CurrentMedications: 'Albuterol',
//     Appointments: [
//       {
//         Doctor: 'Dr. Harris',
//         Date: '2023-10-26',
//         Time: '11:00 AM',
//         Department: 'Pulmonology',
//       },
//       {
//         Doctor: 'Dr. Baker',
//         Date: '2023-10-31',
//         Time: '03:30 PM',
//         Department: 'Allergy & Immunology',
//       },
//     ],
//   },
//   {
//     PatientID: 'P008',
//     FirstName: 'James',
//     LastName: 'Clark',
//     DateOfBirth: '1982-03-22',
//     Gender: 'Male',
//     ContactNumber: '+1 (555) 555-5569',
//     EmailAddress: 'james.clark@example.com',
//     Address: '505 Oak Avenue, Hilltop, USA',
//     EmergencyContactName: 'Linda Clark',
//     EmergencyContactNumber: '+1 (555) 555-5570',
//     InsuranceInformation: 'UVW Insurance, Policy: 75319',
//     MedicalHistory: 'Diabetes',
//     Symptoms: 'High Blood Sugar, Frequent Urination',
//     CurrentMedications: 'Metformin',
//     Appointments: [
//       {
//         Doctor: 'Dr. Roberts',
//         Date: '2023-10-27',
//         Time: '12:15 PM',
//         Department: 'Endocrinology',
//       },
//       {
//         Doctor: 'Dr. Martin',
//         Date: '2023-11-01',
//         Time: '04:00 PM',
//         Department: 'Internal Medicine',
//       },
//     ],
//   },
//   {
//     PatientID: 'P009',
//     FirstName: 'Ella',
//     LastName: 'Hernandez',
//     DateOfBirth: '1999-06-07',
//     Gender: 'Female',
//     ContactNumber: '+1 (555) 555-5571',
//     EmailAddress: 'ella.hernandez@example.com',
//     Address: '606 Pine Drive, Mountainview, USA',
//     EmergencyContactName: 'Carlos Hernandez',
//     EmergencyContactNumber: '+1 (555) 555-5572',
//     InsuranceInformation: 'XYZ Insurance, Policy: 12346',
//     MedicalHistory: 'None',
//     Symptoms: 'Sore Throat, Congestion',
//     CurrentMedications: 'Ibuprofen',
//     Appointments: [
//       {
//         Doctor: 'Dr. Turner',
//         Date: '2023-10-28',
//         Time: '01:45 PM',
//         Department: 'Family Medicine',
//       },
//       {
//         Doctor: 'Dr. Evans',
//         Date: '2023-11-02',
//         Time: '04:30 PM',
//         Department: 'Internal Medicine',
//       },
//     ],
//   },
//   {
//     PatientID: 'P010',
//     FirstName: 'Logan',
//     LastName: 'Young',
//     DateOfBirth: '1992-01-30',
//     Gender: 'Male',
//     ContactNumber: '+1 (555) 555-5573',
//     EmailAddress: 'logan.young@example.com',
//     Address: '707 Willow Lane, Seaside, USA',
//     EmergencyContactName: 'Jennifer Young',
//     EmergencyContactNumber: '+1 (555) 555-5574',
//     InsuranceInformation: 'LMN Insurance, Policy: 24681',
//     MedicalHistory: 'High Cholesterol',
//     Symptoms: 'Chest Pain, Shortness of Breath',
//     CurrentMedications: 'Atorvastatin',
//     Appointments: [
//       {
//         Doctor: 'Dr. Green',
//         Date: '2023-10-29',
//         Time: '02:30 PM',
//         Department: 'Cardiology',
//       },
//       {
//         Doctor: 'Dr. Rodriguez',
//         Date: '2023-11-03',
//         Time: '05:15 PM',
//         Department: 'Endocrinology',
//       },
//     ],
//   },
// ];
const tableHeadings = [
  'Patient ID',
  'First Name',
  'Last Name',
  'Date of Birth',
  'Gender',
  'Contact Number',
  'Email Address',
  'Address',
  'Emergency Contact Name',
  'Emergency Contact Number',
  'Insurance Information',
  'Medical History',
  'Symptoms',
  'Current Medications',
  'Appointments',
];
const PatientModule = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [patientsData, setPatienstData] = useState([]);
  const [newPatient, setNewPatient] = useState({
    FirstName: '',
    LastName: '',
    DateOfBirth: '',
    Gender: '',
    ContactNumber: '',
    EmailAddress: '',
    Address: '',
    EmergencyContactName: '',
    EmergencyContactNumber: '',
    InsuranceInformation: '',
    MedicalHistory: '',
    Symptoms: '',
    CurrentMedications: '',
    AppointmentTime: '',
    AppointmentWith: '',
  });
  const initialRef = useRef(null);
  const { auth } = useContext(AuthContext);

  async function handleCreatePatient() {
    console.log(newPatient);
    if (checkObjectPropsIsEmpty(newPatient)) {
      toast.info('Please enter all the fields', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setLoading(true);
    let newPatientData = {
      token: auth,
      FirstName: newPatient.FirstName,
      LastName: newPatient.LastName,
      DateOfBirth: newPatient.DateOfBirth,
      Gender: newPatient.Gender,
      ContactNumber: newPatient.ContactNumber,
      EmailAddress: newPatient.EmailAddress,
      Address: newPatient.Address,
      EmergencyContactName: newPatient.EmergencyContactName,
      EmergencyContactNumber: newPatient.EmergencyContactNumber,
      InsuranceInformation: newPatient.InsuranceInformation,
      MedicalHistory: newPatient.MedicalHistory,
      Symptoms: newPatient.Symptoms,
      CurrentMedications: newPatient.CurrentMedications,
      Appointments: `${newPatient.AppointmentTime} with ${newPatient.AppointmentWith}`,
    };

    try {
      const result = await axios.post('/patient/create', newPatientData);
      setLoading(false);
      toast.success('New patient saved', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(result);
      getAllPatients();
      onClose();
    } catch (err) {
      setLoading(false);
      toast.error('Error saving the patient details!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(err);
    }
  }

  async function getAllPatients() {
    setLoading(true);
    try {
      const result = await axios.get('/patient/all');
      setPatienstData(result.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error('Error fetching patients list!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(err);
    }
  }
  const handleChange = e => {
    const { name, value } = e.target;
    setNewPatient({
      ...newPatient,
      [name]: value,
    });
  };

  useEffect(() => {
    getAllPatients();
  }, []);

  return (
    <Box>
      <Flex gap={'20px'}>
        <Button
          onClick={onOpen}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
          variant={'solid'}
          colorScheme="teal"
        >
          <Icon as={MdAddCircle}></Icon> <Text>Add Patient</Text>
        </Button>
        <Button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
          variant={'outline'}
          colorScheme="teal"
        >
          <Icon as={AiOutlineUnorderedList}></Icon> <Text>Manage Patients</Text>
        </Button>
      </Flex>
      <TableContainer
        my={'10'}
        border={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
      >
        {loading ? (
          <Flex
            flexDirection={'column'}
            minH={'md'}
            align={'center'}
            justify={'center'}
          >
            <Spinner size={'lg'} />
            <Text fontSize={'xl'}>Loading patients list</Text>
          </Flex>
        ) : (
          <Table variant="striped">
            <TableCaption>Patients Data</TableCaption>

            {patientsData?.length === 0 ? (
              <Flex
                flexDirection={'column'}
                minH={'md'}
                align={'center'}
                justify={'center'}
              >
                <Text
                  color={'dimgray'}
                  sx={{
                    fontSize: '30px',
                    fontWeight: 'bold',
                  }}
                >
                  No Patients data found
                </Text>
              </Flex>
            ) : (
              <>
                <Thead>
                  <Tr>
                    {tableHeadings.map(heading => {
                      return <Th key={heading}>{heading}</Th>;
                    })}
                  </Tr>
                </Thead>
                <Tbody>
                  {patientsData?.map((patient, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{index + 1}</Td>
                        <Td>{patient.FirstName}</Td>
                        <Td>{patient.LastName}</Td>
                        <Td>{patient.DateOfBirth}</Td>
                        <Td>{patient.Gender}</Td>
                        <Td>{patient.ContactNumber}</Td>
                        <Td>{patient.EmailAddress}</Td>
                        <Td>{patient.Address}</Td>
                        <Td>{patient.EmergencyContactName}</Td>
                        <Td>{patient.EmergencyContactNumber}</Td>
                        <Td>{patient.InsuranceInformation}</Td>
                        <Td>{patient.MedicalHistory}</Td>
                        <Td>{patient.Symptoms}</Td>
                        <Td>{patient.CurrentMedications}</Td>
                        <Td>{patient.Appointments}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </>
            )}
          </Table>
        )}
      </TableContainer>
      <CustomModal
        submit={handleCreatePatient}
        size={'xl'}
        ref={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        modalFooterButtonActions={
          <>
            <Button onClick={handleCreatePatient} colorScheme="teal" mr={3}>
              {loading ? <Spinner /> : 'Save'}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </>
        }
      >
        <FlexFormContainer>
          <FormControl>
            <FormLabel>First name</FormLabel>
            <Input
              name="FirstName"
              value={newPatient.FirstName}
              onChange={handleChange}
              placeholder="First name"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last name</FormLabel>
            <Input
              name="LastName"
              value={newPatient.LastName}
              onChange={handleChange}
              placeholder="Last name"
            />
          </FormControl>
        </FlexFormContainer>
        <FlexFormContainer>
          <FormControl>
            <FormLabel>Date of birth</FormLabel>
            <Input
              type="date"
              name="DateOfBirth"
              value={newPatient.DateOfBirth}
              onChange={handleChange}
              placeholder="Date of birth"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <Select
              name="Gender"
              value={newPatient.Gender}
              onChange={handleChange}
              placeholder="Select Gender"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormControl>
        </FlexFormContainer>
        <FlexFormContainer>
          <FormControl>
            <FormLabel>Contact number</FormLabel>
            <Input
              type="tel"
              name="ContactNumber"
              value={newPatient.ContactNumber}
              onChange={handleChange}
              placeholder="Contact number"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="EmailAddress"
              value={newPatient.EmailAddress}
              onChange={handleChange}
              placeholder="Email"
            />
          </FormControl>
        </FlexFormContainer>
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input
            name="Address"
            value={newPatient.Address}
            onChange={handleChange}
            placeholder="Address"
          />
        </FormControl>
        <FlexFormContainer>
          <FormControl>
            <FormLabel>Emergency contact name</FormLabel>
            <Input
              name="EmergencyContactName"
              value={newPatient.EmergencyContactName}
              onChange={handleChange}
              placeholder="Emergency contact name"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Emergency contact number</FormLabel>
            <Input
              type="tel"
              name="EmergencyContactNumber"
              value={newPatient.EmergencyContactNumber}
              onChange={handleChange}
              placeholder="Emergency contact number"
            />
          </FormControl>
        </FlexFormContainer>
        <FlexFormContainer>
          <FormControl>
            <FormLabel>Insurance Information</FormLabel>
            <Input
              name="InsuranceInformation"
              value={newPatient.InsuranceInformation}
              onChange={handleChange}
              placeholder="Insurance Information"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Medical History</FormLabel>
            <Input
              name="MedicalHistory"
              value={newPatient.MedicalHistory}
              onChange={handleChange}
              placeholder="Medical History"
            />
          </FormControl>
        </FlexFormContainer>
        <FlexFormContainer>
          <FormControl>
            <FormLabel>Symptoms</FormLabel>
            <Input
              name="Symptoms"
              value={newPatient.Symptoms}
              onChange={handleChange}
              placeholder="Symptoms"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Current Medications</FormLabel>
            <Input
              name="CurrentMedications"
              value={newPatient.CurrentMedications}
              onChange={handleChange}
              placeholder="Current Medications"
            />
          </FormControl>
        </FlexFormContainer>
        <FlexFormContainer>
          <FormControl>
            <FormLabel>Appointment</FormLabel>
            <Input
              type="date"
              name="AppointmentTime"
              value={newPatient.AppointmentTime}
              onChange={handleChange}
              defaultValue={'2018-06-12T19:30'}
              placeholder="Appointment date and time"
            />
          </FormControl>
          <FormControl>
            <FormLabel>With</FormLabel>
            <Input
              name="AppointmentWith"
              value={newPatient.AppointmentWith}
              onChange={handleChange}
              placeholder="Doctor's name"
            />
          </FormControl>
        </FlexFormContainer>
      </CustomModal>
    </Box>
  );
};

export default PatientModule;
