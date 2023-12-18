import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext, UserContext } from '../App';

export default function NavigationBar() {
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const { auth, updateAuth } = useContext(AuthContext);
  const { userDetails, updateUserDetails } = useContext(UserContext);

  function logoutUser() {
    if (window.confirm('Confirm logout!')) {
      updateUserDetails(null);
      updateAuth(null);
      navigate('/');
    }
  }

  return (
    <Box
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}
    >
      <Flex
        maxW={'1400px'}
        margin={'auto'}
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link to="/">
            <Text
              fontSize={'3xl'}
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}
            >
              MediOpsHub
            </Text>
          </Link>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10} margin={'auto'}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack justify={'flex-end'} direction={'row'} spacing={6}>
          {auth && userDetails?._id ? (
            <UserLoginProfileMenu
              userDetails={userDetails}
              logout={logoutUser}
            />
          ) : (
            <>
              <Link to={'/login'}>
                <Button fontSize={'md'} fontWeight={400} variant={'outline'}>
                  Login
                </Button>
              </Link>

              <Link to={'/register'}>
                <Button
                  fontSize={'md'}
                  fontWeight={600}
                  variant={'solid'}
                  colorScheme={'teal'}
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const UserLoginProfileMenu = ({ userDetails, logout }) => {
  return (
    <Flex alignItems={'center'}>
      <Menu>
        <MenuButton
          as={Button}
          rounded={'full'}
          variant={'link'}
          cursor={'pointer'}
          minW={0}
        >
          <Avatar
            bg="teal.600"
            color={'white'}
            size={'md'}
            name={`${userDetails?.firstName} ${userDetails?.lastName}`}
          />
        </MenuButton>
        <MenuList>
          <Link to={'/dashboard'}>
            <MenuItem>Dashboard</MenuItem>
          </Link>
          <MenuDivider />
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack direction={'row'} spacing={4} margin={'auto'}>
      {NAV_ITEMS.map(navItem => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Box
                p={2}
                fontSize={'md'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                <Link to={navItem.href}>{navItem.label}</Link>
              </Box>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Link to={href}>
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}
          >
            {label}
          </Text>
        </Link>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Box>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Appointments',
    href: '/appointments',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];
