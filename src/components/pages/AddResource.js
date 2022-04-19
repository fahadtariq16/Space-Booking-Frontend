import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Input, Button } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import "./Location.css";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import SidebarContent from "../Dashboard Components/SidebarContent";
import MobileNav from "../Dashboard Components/MobileNav";

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("white.100", "white.900")}>
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
      <AddResource />
    </Box>
  );
}

const AddResource = () => {
  const [name, setName] = useState("");
  const [resourceTypeOption, setResourceTypeOption] = useState([]);
  const [resourceType, setResourceType] = useState("");
  const [locationOption, setLocationOption] = useState([]);
  const [location, setLocation] = useState("");
  const navigate = useNavigate("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios.get("/api/resourceType").then((response) => {
      setResourceTypeOption(response.data);
    });
    axios.get("/api/location").then((response) => {
      setLocationOption(response.data);
    });
  });

  const resourceTypeChange = (e) => {
    setResourceType(e.target.value);
  };

  const locationChange = (e) => {
    setLocation(e.target.value);
  };

  const addResourceHandler = (e) => {
    e.preventDefault();
    const newDetails = {
      name: name,
      resourceType: resourceType,
      location: location,
    };
    axios.post("/api/resource", newDetails).then(() => {
      navigate("/resource");
    });
  };

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={5}>
        <GridItem w="100%" h="10" bg="white.500" />
        <GridItem
          w="100%"
          h="10"
          bg="white.500"
          paddingRight={320}
          marginRight={300}
        >
          <Heading as="h2" size="xl" color="orange">
            Resource Detail
          </Heading>
        </GridItem>
        <GridItem w="100%" h="10" bg="white.500"></GridItem>
        <GridItem w="100%" h="10" bg="white.500" />
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)" gap={5}>
        <GridItem w="100%" h="10" bg="white.500" />
        <GridItem
          w="100%"
          h="10"
          bg="white.500"
          paddingRight={390}
          marginRight={300}
        >
          <FormControl isRequired>
            <FormLabel htmlFor="name">Add Resource Name</FormLabel>
            <Input
              id="name"
              placeholder="Enter Resource Name"
              autoComplete="off"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormLabel htmlFor="resource" marginTop={5}>
              Select Resource Type
            </FormLabel>
            <Select
              placeholder="Select Resource Type"
              onChange={resourceTypeChange}
              multiple={false}
              value={resourceType}
            >
              {resourceTypeOption.map((rt, key) => {
                return (
                  <option value={rt._id} key={key}>
                    {rt.name}
                  </option>
                );
              })}
            </Select>
            <FormLabel htmlFor="location" marginTop={5}>
              Select Location
            </FormLabel>
            <Select
              placeholder="Select Location"
              onChange={locationChange}
              multiple={false}
              value={location}
            >
              {locationOption.map((loc, key) => {
                return (
                  <option value={loc._id} key={key}>
                    {loc.name}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          <Button
            type="submit"
            colorScheme="orange"
            variant="solid"
            w="20"
            h="30"
            marginTop={5}
            onClick={onOpen}
          >
            Add
          </Button>
          <AlertDialog isOpen={isOpen} onClose={onClose}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Add Resource
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? to add this resource.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button
                    colorScheme="orange"
                    onClick={addResourceHandler}
                    ml={3}
                  >
                    Add
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </GridItem>
        <GridItem w="100%" h="10" bg="white.500" />
      </Grid>
    </>
  );
};
