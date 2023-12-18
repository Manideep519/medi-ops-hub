'use client';

import React, { useState } from 'react';
import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Heading,
  Text,
} from '@chakra-ui/react';
import { GiMedicalPack } from 'react-icons/gi';
import { FaUserNurse, FaBriefcaseMedical, FaUser } from 'react-icons/fa';
import { RiAdminFill, RiSettings5Fill } from 'react-icons/ri';
import AdminModule from './AdminModule';
import PatientModule from './PatientModule';
import DoctorModule from './DoctorModule';
import NurseModule from './NurseModule';
import PharmacistModule from './PharmacistModule';
import UserSettings from './UserSettings';

const LinkItems = [
  { name: 'Admin', icon: RiAdminFill },
  { name: 'Patients', icon: FaUser },
  { name: 'Doctors', icon: FaBriefcaseMedical },
  { name: 'Nurses', icon: FaUserNurse },
  { name: 'Pharmacist', icon: GiMedicalPack },
  { name: 'Settings', icon: RiSettings5Fill },
];

export default function Dashboard() {
  const [active, setActive] = useState('Admin');

  return (
    <Box
      minH={`calc(100vh - 61px)`}
      bg={'gray.100'}
      style={{
        display: 'flex',
      }}
    >
      <SidebarContent active={active} setActive={setActive} />
      <Box flex={1} bg={'white'} overflow={'hidden'}>
        <Box
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={'gray.200'}
          style={{
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 30px',
          }}
        >
          <Heading fontWeight={'semibold'} fontSize={'2xl'}>
            {active} Module
          </Heading>
        </Box>
        <Box bg={'white'} p={'10'}>
          {active === 'Admin' ? (
            <AdminModule />
          ) : active === 'Patients' ? (
            <PatientModule />
          ) : active === 'Doctors' ? (
            <DoctorModule />
          ) : active === 'Nurses' ? (
            <NurseModule />
          ) : active === 'Pharmacist' ? (
            <PharmacistModule />
          ) : active === 'Settings' ? (
            <UserSettings />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}

const SidebarContent = ({
  onClose,
  active,
  setActive,
  logoutUser,
  ...rest
}) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      minWidth={'260px'}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace">
          Dashboard
        </Text>
      </Flex>
      {LinkItems.map(link => (
        <NavItem
          icon={link.icon}
          active={active}
          setActive={setActive}
          key={link.name}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};
const NavItem = ({ icon, active, setActive, children, ...rest }) => {
  return (
    <Box style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: active === children ? 'teal.600' : '#edf2f7',
          color: active === children ? 'white' : 'black',
        }}
        bg={active === children ? 'teal.600' : 'transparent'}
        color={active === children ? 'white' : 'inherit'}
        onClick={() => {
          setActive(() => {
            return children;
          });
        }}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Box>
  );
};
