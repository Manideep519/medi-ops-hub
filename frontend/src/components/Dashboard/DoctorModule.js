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
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';
import Select from 'react-select';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { MdAddCircle } from 'react-icons/md';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import CustomModal from '../CustomModal';
import { FlexFormContainer } from '../../helper/components';
import { toast } from 'react-toastify';
import { checkObjectPropsIsEmpty } from '../../helper/utils';
import { AuthContext } from '../../App';
import axios from 'axios';

// const doctorsData = [
//   {
//     DoctorID: 'D001',
//     FirstName: 'Dr. Sarah',
//     LastName: 'Johnson',
//     Gender: 'Female',
//     ContactNumber: '+1 (555) 555-5559',
//     EmailAddress: 'sarah.johnson@example.com',
//     Specialization: 'Cardiology',
//     HospitalAffiliation: 'City General Hospital',
//     AvailableDays: ['Monday', 'Wednesday', 'Friday'],
//     AvailableTimes: ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM'],
//     Education: 'MD in Cardiology, University of Medical Sciences',
//     Experience: '12 years',
//     Certifications: 'Board Certified in Cardiology',
//     LanguagesSpoken: ['English', 'Spanish'],
//     ConsultationFee: '$150',
//   },
//   {
//     DoctorID: 'D002',
//     FirstName: 'Dr. Michael',
//     LastName: 'Brown',
//     Gender: 'Male',
//     ContactNumber: '+1 (555) 555-5561',
//     EmailAddress: 'michael.brown@example.com',
//     Specialization: 'Pulmonology',
//     HospitalAffiliation: 'Metropolitan Hospital',
//     AvailableDays: ['Tuesday', 'Thursday'],
//     AvailableTimes: ['9:00 AM - 11:00 AM', '1:00 PM - 3:00 PM'],
//     Education: 'MD in Pulmonology, University of Medical Sciences',
//     Experience: '15 years',
//     Certifications: 'Board Certified in Pulmonology',
//     LanguagesSpoken: ['English'],
//     ConsultationFee: '$180',
//   },
//   {
//     DoctorID: 'D003',
//     FirstName: 'Dr. Olivia',
//     LastName: 'Anderson',
//     Gender: 'Female',
//     ContactNumber: '+1 (555) 555-5567',
//     EmailAddress: 'olivia.anderson@example.com',
//     Specialization: 'Dermatology',
//     HospitalAffiliation: 'Sunset Dermatology Clinic',
//     AvailableDays: ['Monday', 'Wednesday', 'Friday'],
//     AvailableTimes: ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM'],
//     Education: 'MD in Dermatology, University of Medical Sciences',
//     Experience: '10 years',
//     Certifications: 'Board Certified in Dermatology',
//     LanguagesSpoken: ['English', 'French'],
//     ConsultationFee: '$120',
//   },
//   {
//     DoctorID: 'D004',
//     FirstName: 'Dr. James',
//     LastName: 'Clark',
//     Gender: 'Male',
//     ContactNumber: '+1 (555) 555-5569',
//     EmailAddress: 'james.clark@example.com',
//     Specialization: 'Endocrinology',
//     HospitalAffiliation: 'Metropolitan Hospital',
//     AvailableDays: ['Tuesday', 'Thursday'],
//     AvailableTimes: ['9:00 AM - 11:00 AM', '1:00 PM - 3:00 PM'],
//     Education: 'MD in Endocrinology, University of Medical Sciences',
//     Experience: '18 years',
//     Certifications: 'Board Certified in Endocrinology',
//     LanguagesSpoken: ['English', 'Spanish'],
//     ConsultationFee: '$160',
//   },
//   {
//     DoctorID: 'D005',
//     FirstName: 'Dr. Ella',
//     LastName: 'Hernandez',
//     Gender: 'Female',
//     ContactNumber: '+1 (555) 555-5571',
//     EmailAddress: 'ella.hernandez@example.com',
//     Specialization: 'Family Medicine',
//     HospitalAffiliation: 'Hilltop Family Clinic',
//     AvailableDays: ['Monday', 'Wednesday', 'Friday'],
//     AvailableTimes: ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM'],
//     Education: 'MD in Family Medicine, University of Medical Sciences',
//     Experience: '14 years',
//     Certifications: 'Board Certified in Family Medicine',
//     LanguagesSpoken: ['English', 'Spanish'],
//     ConsultationFee: '$130',
//   },
//   {
//     DoctorID: 'D006',
//     FirstName: 'Dr. Logan',
//     LastName: 'Young',
//     Gender: 'Male',
//     ContactNumber: '+1 (555) 555-5573',
//     EmailAddress: 'logan.young@example.com',
//     Specialization: 'Gastroenterology',
//     HospitalAffiliation: 'Riverside Gastro Clinic',
//     AvailableDays: ['Tuesday', 'Thursday'],
//     AvailableTimes: ['9:00 AM - 11:00 AM', '1:00 PM - 3:00 PM'],
//     Education: 'MD in Gastroenterology, University of Medical Sciences',
//     Experience: '16 years',
//     Certifications: 'Board Certified in Gastroenterology',
//     LanguagesSpoken: ['English'],
//     ConsultationFee: '$170',
//   },
//   {
//     DoctorID: 'D007',
//     FirstName: 'Dr. Ava',
//     LastName: 'Martinez',
//     Gender: 'Female',
//     ContactNumber: '+1 (555) 555-5575',
//     EmailAddress: 'ava.martinez@example.com',
//     Specialization: 'Neurology',
//     HospitalAffiliation: 'City Neurology Center',
//     AvailableDays: ['Monday', 'Wednesday', 'Friday'],
//     AvailableTimes: ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM'],
//     Education: 'MD in Neurology, University of Medical Sciences',
//     Experience: '20 years',
//     Certifications: 'Board Certified in Neurology',
//     LanguagesSpoken: ['English', 'Spanish'],
//     ConsultationFee: '$190',
//   },
//   {
//     DoctorID: 'D008',
//     FirstName: 'Dr. Liam',
//     LastName: 'Garcia',
//     Gender: 'Male',
//     ContactNumber: '+1 (555) 555-5577',
//     EmailAddress: 'liam.garcia@example.com',
//     Specialization: 'Ophthalmology',
//     HospitalAffiliation: 'Sunset Eye Clinic',
//     AvailableDays: ['Tuesday', 'Thursday'],
//     AvailableTimes: ['9:00 AM - 11:00 AM', '1:00 PM - 3:00 PM'],
//     Education: 'MD in Ophthalmology, University of Medical Sciences',
//     Experience: '13 years',
//     Certifications: 'Board Certified in Ophthalmology',
//     LanguagesSpoken: ['English'],
//     ConsultationFee: '$150',
//   },
//   {
//     DoctorID: 'D009',
//     FirstName: 'Dr. Mia',
//     LastName: 'Rodriguez',
//     Gender: 'Female',
//     ContactNumber: '+1 (555) 555-5579',
//     EmailAddress: 'mia.rodriguez@example.com',
//     Specialization: 'Orthopedics',
//     HospitalAffiliation: 'Hillside Ortho Center',
//     AvailableDays: ['Monday', 'Wednesday', 'Friday'],
//     AvailableTimes: ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM'],
//     Education: 'MD in Orthopedics, University of Medical Sciences',
//     Experience: '17 years',
//     Certifications: 'Board Certified in Orthopedics',
//     LanguagesSpoken: ['English', 'Spanish'],
//     ConsultationFee: '$170',
//   },
//   {
//     DoctorID: 'D010',
//     FirstName: 'Dr. Mason',
//     LastName: 'Lopez',
//     Gender: 'Male',
//     ContactNumber: '+1 (555) 555-5581',
//     EmailAddress: 'mason.lopez@example.com',
//     Specialization: 'Pediatrics',
//     HospitalAffiliation: 'Riverside Pediatric Clinic',
//     AvailableDays: ['Tuesday', 'Thursday'],
//     AvailableTimes: ['9:00 AM - 11:00 AM', '1:00 PM - 3:00 PM'],
//     Education: 'MD in Pediatrics, University of Medical Sciences',
//     Experience: '19 years',
//     Certifications: 'Board Certified in Pediatrics',
//     LanguagesSpoken: ['English', 'Spanish'],
//     ConsultationFee: '$140',
//   },
// ];

const doctorTableHeadings = [
  'Doctor ID',
  'First Name',
  'Last Name',
  'Gender',
  'Contact Number',
  'Email Address',
  'Specialization',
  'Hospital Affiliation',
  'Available Days',
  'Available Times',
  'Education',
  'Experience (Years)',
  'Certifications',
  'Consultation Fee ($)',
];

const DoctorModule = () => {
  const daysOptions = [
    { value: 'sunday', label: 'Sunday' },
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
  ];
  const shifts = [
    { value: '09:00 AM - 11:00 AM', label: '09:00 AM - 11:00 AM' },
    { value: '11:00 AM - 01:00 PM', label: '11:00 AM - 01:00 PM' },
    { value: '01:00 PM - 03:00 PM', label: '01:00 PM - 03:00 PM' },
    { value: '03:00 PM - 05:00 PM', label: '03:00 PM - 05:00 PM' },
  ];
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  const { auth } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [doctorsData, setDoctorsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    FirstName: '',
    LastName: '',
    Gender: '',
    ContactNumber: '',
    EmailAddress: '',
    Specialization: '',
    HospitalAffiliation: '',
    AvailableDays: '',
    AvailableTimes: '',
    Education: '',
    Experience: '',
    Certifications: '',
    ConsultationFee: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setNewDoctor(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSelectChange = (option, action) => {
    setNewDoctor(prev => {
      return {
        ...prev,
        [action.name]: Array.isArray(option)
          ? option?.map(option => option.value).join(',')
          : option.value,
      };
    });
  };

  async function handleCreateDoctor() {
    console.log(newDoctor);
    if (checkObjectPropsIsEmpty(newDoctor)) {
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
    let newDoctorData = {
      token: auth,
      FirstName: newDoctor.FirstName,
      LastName: newDoctor.LastName,
      Gender: newDoctor.Gender,
      ContactNumber: newDoctor.ContactNumber,
      EmailAddress: newDoctor.EmailAddress,
      Specialization: newDoctor.Specialization,
      HospitalAffiliation: newDoctor.HospitalAffiliation,
      AvailableDays: newDoctor.AvailableDays,
      AvailableTimes: newDoctor.AvailableTimes,
      Education: newDoctor.Education,
      Experience: newDoctor.Experience,
      Certifications: newDoctor.Certifications,
      ConsultationFee: newDoctor.ConsultationFee,
    };

    try {
      const result = await axios.post('/doctor/create', newDoctorData);
      setLoading(false);
      toast.success('New doctor saved', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(result);
      getAllDoctors();
      onClose();
    } catch (err) {
      setLoading(false);
      toast.error('Error saving the doctor details!', {
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

  async function getAllDoctors() {
    setLoading(true);
    try {
      const result = await axios.get('/doctor/all');
      setDoctorsData(result.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error('Error fetching doctors list!', {
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

  useEffect(() => {
    getAllDoctors();
  }, []);

  const initialRef = useRef(null);
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
          <Icon as={MdAddCircle}></Icon> <Text>Add Doctor</Text>
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
          <Icon as={AiOutlineUnorderedList}></Icon> <Text>Manage Doctors</Text>
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
            <TableCaption>Doctors Data</TableCaption>
            {doctorsData?.length === 0 ? (
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
                  No Doctors data found
                </Text>
              </Flex>
            ) : (
              <>
                <Thead>
                  <Tr>
                    {doctorTableHeadings.map(heading => {
                      return <Th key={heading}>{heading}</Th>;
                    })}
                  </Tr>
                </Thead>
                <Tbody>
                  {doctorsData?.map((doctor, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{index + 1}</Td>
                        <Td>{doctor.FirstName}</Td>
                        <Td>{doctor.LastName}</Td>
                        <Td>{doctor.Gender}</Td>
                        <Td>{doctor.ContactNumber}</Td>
                        <Td>{doctor.EmailAddress}</Td>
                        <Td>{doctor.Specialization}</Td>
                        <Td>{doctor.HospitalAffiliation}</Td>
                        <Td>{doctor.AvailableDays}</Td>
                        <Td>{doctor.AvailableTimes}</Td>
                        <Td>{doctor.Education}</Td>
                        <Td>{doctor.Experience}</Td>
                        <Td>{doctor.Certifications}</Td>
                        <Td>{doctor.ConsultationFee}</Td>
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
        size={'xl'}
        ref={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        modalFooterButtonActions={
          <>
            <Button onClick={handleCreateDoctor} colorScheme="teal" mr={3}>
              {loading ? <Spinner /> : 'Save'}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </>
        }
      >
        <FlexFormContainer>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter First Name"
              name="FirstName"
              value={newDoctor.FirstName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter Last Name"
              name="LastName"
              value={newDoctor.LastName}
              onChange={handleChange}
            />
          </FormControl>
        </FlexFormContainer>
        <FlexFormContainer>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <Select
              isSearchable={false}
              name="Gender"
              onChange={handleSelectChange}
              placeholder="Select Gender"
              options={genderOptions}
            />
          </FormControl>
        </FlexFormContainer>
        <FlexFormContainer>
          <FormControl>
            <FormLabel>Contact Number</FormLabel>
            <Input
              type="tel"
              placeholder="Enter Contact Number"
              name="ContactNumber"
              value={newDoctor.ContactNumber}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter Email Address"
              name="EmailAddress"
              value={newDoctor.EmailAddress}
              onChange={handleChange}
            />
          </FormControl>
        </FlexFormContainer>
        <FlexFormContainer>
          <FormControl>
            <FormLabel>Specialization</FormLabel>
            <Input
              type="text"
              placeholder="Enter Specialization"
              name="Specialization"
              value={newDoctor.Specialization}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Hospital Affiliation</FormLabel>
            <Input
              type="text"
              placeholder="Enter Hospital Affiliation"
              name="HospitalAffiliation"
              value={newDoctor.HospitalAffiliation}
              onChange={handleChange}
            />
          </FormControl>
        </FlexFormContainer>
        <FlexFormContainer>
          <FormControl>
            <FormLabel>Available Days</FormLabel>
            <Select
              isMulti
              isSearchable={false}
              options={daysOptions}
              placeholder="Enter Available Days"
              name="AvailableDays"
              onChange={handleSelectChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Available Times</FormLabel>
            <Select
              isMulti
              isSearchable={false}
              options={shifts}
              placeholder="Enter Available Times"
              name="AvailableTimes"
              onChange={handleSelectChange}
            />
          </FormControl>
        </FlexFormContainer>
        <FlexFormContainer>
          <FormControl>
            <FormLabel>Education</FormLabel>
            <Input
              type="text"
              placeholder="Enter Education"
              name="Education"
              value={newDoctor.Education}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Experience (years)</FormLabel>
            <Input
              type="text"
              placeholder="Enter Experience (years)"
              name="Experience"
              value={newDoctor.Experience}
              onChange={handleChange}
            />
          </FormControl>
        </FlexFormContainer>
        <FlexFormContainer>
          <FormControl>
            <FormLabel>Certifications</FormLabel>
            <Input
              type="text"
              placeholder="Enter Certifications"
              name="Certifications"
              value={newDoctor.Certifications}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Consultation Fee</FormLabel>
            <Input
              type="text"
              placeholder="Enter Consultation Fee"
              name="ConsultationFee"
              value={newDoctor.ConsultationFee}
              onChange={handleChange}
            />
          </FormControl>
        </FlexFormContainer>
      </CustomModal>
    </Box>
  );
};

export default DoctorModule;
