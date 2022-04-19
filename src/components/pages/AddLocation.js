import { React, useState } from "react";
import "./Location.css";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  GridItem,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
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
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

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
      <AddLocation />
    </Box>
  );
}

const AddLocation = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addLocationHandler = (e) => {
    const newDetails = {
      name: name,
    };
    axios.post(`/api/location`, newDetails).then(() => {
      navigate("/location");
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
            Location Detail
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
          paddingRight={370}
          marginRight={300}
        >
          <FormControl isRequired>
            <FormLabel htmlFor="name">Add Location Name</FormLabel>
            <Input
              id="name"
              placeholder="Enter Location Name"
              autoComplete="off"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
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
                  Add Loction
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? to add this location.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button
                    colorScheme="orange"
                    onClick={addLocationHandler}
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
