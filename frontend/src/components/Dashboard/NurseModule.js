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
  Spinner,
} from '@chakra-ui/react';

import React, { useContext, useEffect, useRef, useState } from 'react';
import Select from 'react-select';

import { MdAddCircle } from 'react-icons/md';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import CustomModal from '../CustomModal';
import { FlexFormContainer } from '../../helper/components';
import { toast } from 'react-toastify';
import { checkObjectPropsIsEmpty } from '../../helper/utils';
import { AuthContext } from '../../App';
import axios from 'axios';
// const nursesData = [
//   {
//     NurseID: 'N001',
//     FirstName: 'Emily',
//     LastName: 'Johnson',
//     Gender: 'Female',
//     ContactNumber: '+1 (555) 555-5559',
//     EmailAddress: 'emily.johnson@example.com',
//     Department: 'Cardiology',
//     Shifts: ['Morning', 'Evening'],
//   },
//   {
//     NurseID: 'N002',
//     FirstName: 'William',
//     LastName: 'Brown',
//     Gender: 'Male',
//     ContactNumber: '+1 (555) 555-5561',
//     EmailAddress: 'william.brown@example.com',
//     Department: 'Emergency',
//     Shifts: ['Night'],
//   },
//   {
//     NurseID: 'N003',
//     FirstName: 'Olivia',
//     LastName: 'Davis',
//     Gender: 'Female',
//     ContactNumber: '+1 (555) 555-5563',
//     EmailAddress: 'olivia.davis@example.com',
//     Department: 'Pulmonology',
//     Shifts: ['Morning', 'Evening'],
//   },
//   {
//     NurseID: 'N004',
//     FirstName: 'James',
//     LastName: 'Martinez',
//     Gender: 'Male',
//     ContactNumber: '+1 (555) 555-5565',
//     EmailAddress: 'james.martinez@example.com',
//     Department: 'Orthopedics',
//     Shifts: ['Night'],
//   },
//   {
//     NurseID: 'N005',
//     FirstName: 'Ava',
//     LastName: 'Garcia',
//     Gender: 'Female',
//     ContactNumber: '+1 (555) 555-5567',
//     EmailAddress: 'ava.garcia@example.com',
//     Department: 'Neurology',
//     Shifts: ['Morning', 'Evening'],
//   },
//   {
//     NurseID: 'N006',
//     FirstName: 'Liam',
//     LastName: 'Rodriguez',
//     Gender: 'Male',
//     ContactNumber: '+1 (555) 555-5569',
//     EmailAddress: 'liam.rodriguez@example.com',
//     Department: 'Ophthalmology',
//     Shifts: ['Night'],
//   },
//   {
//     NurseID: 'N007',
//     FirstName: 'Mia',
//     LastName: 'Lopez',
//     Gender: 'Female',
//     ContactNumber: '+1 (555) 555-5571',
//     EmailAddress: 'mia.lopez@example.com',
//     Department: 'Gastroenterology',
//     Shifts: ['Morning', 'Evening'],
//   },
//   {
//     NurseID: 'N008',
//     FirstName: 'Ella',
//     LastName: 'Young',
//     Gender: 'Female',
//     ContactNumber: '+1 (555) 555-5573',
//     EmailAddress: 'ella.young@example.com',
//     Department: 'Dermatology',
//     Shifts: ['Night'],
//   },
//   {
//     NurseID: 'N009',
//     FirstName: 'Logan',
//     LastName: 'Anderson',
//     Gender: 'Male',
//     ContactNumber: '+1 (555) 555-5575',
//     EmailAddress: 'logan.anderson@example.com',
//     Department: 'Endocrinology',
//     Shifts: ['Morning', 'Evening'],
//   },
//   {
//     NurseID: 'N010',
//     FirstName: 'Aiden',
//     LastName: 'Clark',
//     Gender: 'Male',
//     ContactNumber: '+1 (555) 555-5577',
//     EmailAddress: 'aiden.clark@example.com',
//     Department: 'Family Medicine',
//     Shifts: ['Night'],
//   },
// ];
const nurseTableHeadings = [
  'Nurse ID',
  'First Name',
  'Last Name',
  'Gender',
  'Contact Number',
  'Email Address',
  'Department',
  'Shifts',
];
const NurseModule = () => {
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
  const initialRef = useRef(null);
  const [nurseData, setNurseData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newNurse, setNewNurse] = useState({
    FirstName: '',
    LastName: '',
    Gender: '',
    ContactNumber: '',
    EmailAddress: '',
    Department: '',
    Shifts: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewNurse(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSelectChange = (option, action) => {
    setNewNurse(prev => {
      return {
        ...prev,
        [action.name]: Array.isArray(option)
          ? option?.map(option => option.value).join(', ')
          : option.value,
      };
    });
  };

  async function handleCreateNurse() {
    console.log(newNurse);
    if (checkObjectPropsIsEmpty(newNurse)) {
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
    let newNurseData = {
      token: auth,
      FirstName: newNurse.FirstName,
      LastName: newNurse.LastName,
      Gender: newNurse.Gender,
      ContactNumber: newNurse.ContactNumber,
      EmailAddress: newNurse.EmailAddress,
      Department: newNurse.Department,
      Shifts: newNurse.Shifts,
    };

    try {
      const result = await axios.post('/nurse/create', newNurseData);
      setLoading(false);
      toast.success('New nurse saved', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(result);
      getAllNurses();
      onClose();
    } catch (err) {
      setLoading(false);
      toast.error('Error saving the nurse details!', {
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

  async function getAllNurses() {
    setLoading(true);
    try {
      const result = await axios.get('/nurse/all');
      setNurseData(result.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error('Error fetching nurses list!', {
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
    getAllNurses();
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
          <Icon as={MdAddCircle}></Icon> <Text>Add Nurse</Text>
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
          <Icon as={AiOutlineUnorderedList}></Icon> <Text>Manage Nurses</Text>
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
            <TableCaption>Nurses Data</TableCaption>
            {nurseData?.length === 0 ? (
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
                    {nurseTableHeadings.map(heading => {
                      return <Th key={heading}>{heading}</Th>;
                    })}
                  </Tr>
                </Thead>
                <Tbody>
                  {nurseData?.map((nurse, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{index + 1}</Td>
                        <Td>{nurse.FirstName}</Td>
                        <Td>{nurse.LastName}</Td>
                        <Td>{nurse.Gender}</Td>
                        <Td>{nurse.ContactNumber}</Td>
                        <Td>{nurse.EmailAddress}</Td>
                        <Td>{nurse.Department}</Td>
                        <Td>{nurse.Shifts}</Td>
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
        size="xl"
        ref={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        modalFooterButtonActions={
          <>
            <Button onClick={handleCreateNurse} colorScheme="teal" mr={3}>
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
              value={newNurse.FirstName}
              onChange={handleInputChange}
              name="FirstName"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter Last Name"
              value={newNurse.LastName}
              onChange={handleInputChange}
              name="LastName"
            />
          </FormControl>
        </FlexFormContainer>
        <FlexFormContainer>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <Select
              name="Gender"
              options={genderOptions}
              placeholder="Select Gender"
              onChange={handleSelectChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormControl>
        </FlexFormContainer>
        <FlexFormContainer>
          <FormControl>
            <FormLabel>Contact Number</FormLabel>
            <Input
              type="tel"
              placeholder="Enter Contact Number"
              value={newNurse.ContactNumber}
              onChange={handleInputChange}
              name="ContactNumber"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter Email Address"
              value={newNurse.EmailAddress}
              onChange={handleInputChange}
              name="EmailAddress"
            />
          </FormControl>
        </FlexFormContainer>
        <FlexFormContainer>
          <FormControl>
            <FormLabel>Department</FormLabel>
            <Input
              type="text"
              placeholder="Enter Department"
              value={newNurse.Department}
              onChange={handleInputChange}
              name="Department"
            />
          </FormControl>
        </FlexFormContainer>
        <FlexFormContainer>
          <FormControl>
            <FormLabel>Shifts</FormLabel>
            <Select
              options={shifts}
              placeholder="Select Shifts"
              onChange={handleSelectChange}
              isMulti
              name="Shifts"
            >
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </Select>
          </FormControl>
        </FlexFormContainer>
      </CustomModal>
    </Box>
  );
};

export default NurseModule;
