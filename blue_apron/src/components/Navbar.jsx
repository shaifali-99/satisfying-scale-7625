  import pic from "../images/bigBite(1).png";
  // import pic from "../images/bigBite.png";

  import {
      Box,
      Flex,
      Text,
      IconButton,
      Button,
      Stack,
      Collapse,
      Link,
      Popover,
      PopoverTrigger,
      useColorModeValue,
      useBreakpointValue,
      useDisclosure,
      useConst,
    } from '@chakra-ui/react';
    import {
      HamburgerIcon,
      CloseIcon,
    } from '@chakra-ui/icons';
  import {AuthContext} from '../context/AuthContext'
import { useContext,useEffect } from "react";
import { Navigate } from "react-router-dom";

  const NAV_ITEMS = [
    {
      label: 'ON THE MENU',
      href : '/on_the_menu'
    },
    {
      label: 'PRICING',
      href : '/pricing'
    },
    {
      label: 'WINE',
      href:'/wine'
    },
    {
      label: 'GIFT',
      href: '/gift',
    },
    {
      label: 'MARKET',
      href: '/market',
    },
  ];
  
  export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();
    const {login,logOut,isAuth}=useContext(AuthContext);
    console.log("onNavbar",isAuth);
    useEffect(()=>{
      if(isAuth){
        return <Navigate to="/"/>
      }
    },[])
    return (
      <Box>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 2 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
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
            <Link href='/'>
              <Text
                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                fontFamily={'heading'}
                color={useColorModeValue('gray.800', 'white')}>
                <img src={pic} alt="logo" 
                style={{width:'90px',height:'70px',padding:'0%',marginLeft:'3rem',border:'0px solid'}}/>
              </Text>
            </Link>
  
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
  
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
              {isAuth?(<>
              {/* <Navigate to="/"/>; */}
              <Button onClick={logOut}>LogOut</Button></>):
            <Button
              as={'a'}
              fontSize={'sm'}
              fontWeight={400}
              variant={'link'}
              href={'/login'}>
              Log In
            </Button>
              }
              <Link href={'/signup'}>
                <Button
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'orange.500'}
                  _hover={{
                    bg: 'orange.400',
                  }}>
                  Sign Up
                </Button>
              </Link>
          </Stack>
        </Flex>
  
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    );
  }
  
  const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
  
    return (
      <Stack direction={'row'} spacing={4} mt={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Link
                  p={2}
                  // border={'1px solid black'}
                  href={navItem.href ?? '#'}
                  fontSize={'sm'}
                  fontWeight={400}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}>
                  {navItem.label}
                </Link>
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
        display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };
  
  const MobileNavItem = (props) => {
    const {label, href }=props
    // const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4}
      //  onClick={onToggle}
       >
        <Flex
          py={2}
          as={Link}
          href={href ?? '#'}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
        </Flex>
      </Stack>
    );
  };
  