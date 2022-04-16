import { React, useState, useEffect } from "react";
import source from "../../logo-2.png";
import { Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import { ListItem, UnorderedList, Heading } from "@chakra-ui/react";
import axios from "axios";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import "./Resource.css";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiBriefcase,
  FiBookOpen,
  FiBook,
  FiUser,
  FiSettings,
  FiMenu,
  FiChevronDown,
} from "react-icons/fi";

const LinkItems = [
  { name: "Location", icon: FiBriefcase, src: "/location" },
  { name: "Resource", icon: FiBook, src: "/resource" },
  { name: "Resouce Type", icon: FiBookOpen, src: "/resourceType" },
  { name: "User", icon: FiUser, src: "/user" },
  { name: "Settings", icon: FiSettings, src: "/setting" },
];

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
      <Resource />
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <Image src={source} alt="Dan Abramov" w="50" h="50" />
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} src={link.src} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, src, children, ...rest }) => {
  return (
    <NavLink
      to={src}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "orange.300",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NavLink>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const navigate = useNavigate();
  const logoutHandle = () => {
    localStorage.setItem("authToken", "");
    localStorage.setItem("Role", "");
    localStorage.setItem("UserID", "");
    navigate("/login");
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <Image src={source} alt="Dan Abramov" w="50" h="50" />
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={source} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  {/* <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text> */}
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logoutHandle}>logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const Resource = () => {
  const [resource, setResource] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/resource").then((response) => {
      setResource(response.data);
    });
  }, [resource]);

  const deletebtn = (id) => {
    axios.patch(`/api/resource/${id}`);
  };

  const editbtn = (id) => {
    navigate(`/resourceDetail/${id}`);
  };

  const addbtn = () => {
    navigate("/addResource");
  };

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={5}>
        <GridItem w="100%" h="10" bg="white.500" />
        <GridItem w="100%" h="10" bg="white.500" paddingRight={600}>
          <Heading as="h2" size="xl" color="orange">
            Resources
          </Heading>
        </GridItem>
        <GridItem w="100%" h="10" bg="white.500">
          <div>
            <Heading
              as="h4"
              size="md"
              color="orange"
              paddingTop={50}
              style={{ display: "inline-block" }}
            >
              Add Resource
            </Heading>
            <Button
              colorScheme="blue"
              size="sm"
              style={{ marginLeft: "20px", backgroundColor: "orange" }}
              onClick={addbtn}
            >
              <AddIcon className="addicon"></AddIcon>
            </Button>
          </div>
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)" gap={5}>
        <GridItem w="100%" h="10" bg="white.500" />
        <GridItem
          w="100%"
          h="10"
          bg="white.500"
          paddingRight={460}
          marginRight={280}
          paddingTop={25}
        >
          <UnorderedList>
            {resource.map((r, key) => {
              return (
                <div key={key}>
                  <ListItem
                    style={{
                      display: "inline-block",
                      marginBottom: "20px",
                      paddingRight: "20px",
                    }}
                  >
                    {r.name}
                  </ListItem>
                  <DeleteIcon
                    onClick={() => deletebtn(r._id)}
                    className="deleteicon"
                    style={{
                      marginRight: "20px",
                    }}
                  />
                  <EditIcon
                    onClick={() => editbtn(r._id)}
                    className="editicon"
                  />
                </div>
              );
            })}
          </UnorderedList>
        </GridItem>
        <GridItem w="100%" h="10" bg="white.500" />
      </Grid>
    </>
  );
};
