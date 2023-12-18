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

import { MdAddCircle } from 'react-icons/md';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import CustomModal from '../CustomModal';
import { toast } from 'react-toastify';
import { checkObjectPropsIsEmpty } from '../../helper/utils';
import { AuthContext } from '../../App';
import axios from 'axios';

const medicationTableHeadings = [
  'Medication ID',
  'Medication Name',
  'Quantity in Stock',
  'Expiry Date',
  'Manufacturer',
  'Price per Unit ($)',
];

// const medicationData = [
//   {
//     MedicationID: 'M001',
//     MedicationName: 'Aspirin',
//     Dosage: '100mg',
//     QuantityInStock: 500,
//     ExpiryDate: '2023-12-31',
//     Manufacturer: 'Bayer',
//     PricePerUnit: '$0.10',
//     PatientConsultations: 15,
//   },
//   {
//     MedicationID: 'M002',
//     MedicationName: 'Ibuprofen',
//     Dosage: '200mg',
//     QuantityInStock: 300,
//     ExpiryDate: '2023-11-30',
//     Manufacturer: 'Advil',
//     PricePerUnit: '$0.15',
//     PatientConsultations: 10,
//   },
//   {
//     MedicationID: 'M003',
//     MedicationName: 'Acetaminophen',
//     Dosage: '250mg',
//     QuantityInStock: 400,
//     ExpiryDate: '2023-12-15',
//     Manufacturer: 'Tylenol',
//     PricePerUnit: '$0.12',
//     PatientConsultations: 12,
//   },
//   {
//     MedicationID: 'M004',
//     MedicationName: 'Lisinopril',
//     Dosage: '10mg',
//     QuantityInStock: 200,
//     ExpiryDate: '2024-02-28',
//     Manufacturer: 'Zestril',
//     PricePerUnit: '$0.25',
//     PatientConsultations: 8,
//   },
//   {
//     MedicationID: 'M005',
//     MedicationName: 'Simvastatin',
//     Dosage: '20mg',
//     QuantityInStock: 150,
//     ExpiryDate: '2024-01-31',
//     Manufacturer: 'Zocor',
//     PricePerUnit: '$0.20',
//     PatientConsultations: 6,
//   },
//   {
//     MedicationID: 'M006',
//     MedicationName: 'Metformin',
//     Dosage: '500mg',
//     QuantityInStock: 300,
//     ExpiryDate: '2023-11-30',
//     Manufacturer: 'Glucophage',
//     PricePerUnit: '$0.18',
//     PatientConsultations: 10,
//   },
//   {
//     MedicationID: 'M007',
//     MedicationName: 'Amoxicillin',
//     Dosage: '250mg',
//     QuantityInStock: 100,
//     ExpiryDate: '2023-10-31',
//     Manufacturer: 'Amoxil',
//     PricePerUnit: '$0.22',
//     PatientConsultations: 5,
//   },
//   {
//     MedicationID: 'M008',
//     MedicationName: 'Omeprazole',
//     Dosage: '20mg',
//     QuantityInStock: 180,
//     ExpiryDate: '2024-02-29',
//     Manufacturer: 'Prilosec',
//     PricePerUnit: '$0.30',
//     PatientConsultations: 7,
//   },
//   {
//     MedicationID: 'M009',
//     MedicationName: 'Atorvastatin',
//     Dosage: '10mg',
//     QuantityInStock: 120,
//     ExpiryDate: '2024-03-31',
//     Manufacturer: 'Lipitor',
//     PricePerUnit: '$0.28',
//     PatientConsultations: 9,
//   },
//   {
//     MedicationID: 'M010',
//     MedicationName: 'Hydrochlorothiazide',
//     Dosage: '25mg',
//     QuantityInStock: 90,
//     ExpiryDate: '2023-12-31',
//     Manufacturer: 'Microzide',
//     PricePerUnit: '$0.32',
//     PatientConsultations: 4,
//   },
// ];

const PharmacistModule = () => {
  const { auth } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const [medicineData, setMedicinetData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newPharmacist, setNewPharmacist] = useState({
    MedicationName: '',
    QuantityInStock: '',
    ExpiryDate: '',
    Manufacturer: '',
    PricePerUnit: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setNewPharmacist({
      ...newPharmacist,
      [name]: value,
    });
  };

  async function handleCreateNurse() {
    console.log(newPharmacist);
    if (checkObjectPropsIsEmpty(newPharmacist)) {
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
    let newPharmacistData = {
      token: auth,
      MedicationName: newPharmacist.MedicationName,
      QuantityInStock: newPharmacist.QuantityInStock,
      ExpiryDate: newPharmacist.ExpiryDate,
      Manufacturer: newPharmacist.Manufacturer,
      PricePerUnit: newPharmacist.PricePerUnit,
    };

    try {
      const result = await axios.post('/pharmacist/create', newPharmacistData);
      setLoading(false);
      toast.success('New medicine saved', {
        position: 'top-center',
        autoClose: 30000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(result);
      getAllMedicines();
      onClose();
    } catch (err) {
      setLoading(false);
      toast.error('Error saving the medicine details!', {
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

  async function getAllMedicines() {
    setLoading(true);
    try {
      const result = await axios.get('/pharmacist/all');
      setMedicinetData(result.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error('Error fetching medicines list!', {
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
    getAllMedicines();
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
          <Icon as={MdAddCircle}></Icon> <Text>Add Medicin</Text>
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
          <Icon as={AiOutlineUnorderedList}></Icon> <Text>Manage Medicins</Text>
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
            <TableCaption>Pharmacist Data</TableCaption>
            {medicineData?.length === 0 ? (
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
                  No Medicine data found
                </Text>
              </Flex>
            ) : (
              <>
                <Thead>
                  <Tr>
                    {medicationTableHeadings.map(heading => {
                      return <Th key={heading}>{heading}</Th>;
                    })}
                  </Tr>
                </Thead>
                <Tbody>
                  {medicineData?.map((medicie, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{index + 1}</Td>
                        <Td>{medicie.MedicationName}</Td>
                        <Td>{medicie.QuantityInStock}</Td>
                        <Td>{medicie.ExpiryDate}</Td>
                        <Td>{medicie.Manufacturer}</Td>
                        <Td>{medicie.PricePerUnit}</Td>
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
        <FormControl mt="4">
          <FormLabel>Medication Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter Medication Name"
            name="MedicationName"
            value={newPharmacist.MedicationName}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mt="4">
          <FormLabel>Quantity in Stock</FormLabel>
          <Input
            type="text"
            placeholder="Enter Quantity in Stock"
            name="QuantityInStock"
            value={newPharmacist.QuantityInStock}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mt="4">
          <FormLabel>Expiry Date</FormLabel>
          <Input
            type="date"
            placeholder="Select Expiry Date"
            name="ExpiryDate"
            value={newPharmacist.ExpiryDate}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mt="4">
          <FormLabel>Manufacturer</FormLabel>
          <Input
            type="text"
            placeholder="Enter Manufacturer"
            name="Manufacturer"
            value={newPharmacist.Manufacturer}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mt="4">
          <FormLabel>Price per Unit</FormLabel>
          <Input
            type="text"
            placeholder="$"
            name="PricePerUnit"
            value={newPharmacist.PricePerUnit}
            onChange={handleChange}
          />
        </FormControl>
      </CustomModal>
    </Box>
  );
};

export default PharmacistModule;
