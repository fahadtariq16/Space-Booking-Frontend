import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Input, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
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
import SidebarContent from "../Dashboard Components/SidebarContent";
import MobileNav from "../Dashboard Components/MobileNav";
import axios from "axios";

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
      <ResourceDetail />
    </Box>
  );
}

const ResourceDetail = () => {
  const [name, setName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    axios.get(`/api/resource/${id}`).then((response) => {
      setName(response.data.name);
    });
  }, [id]);

  const editHandler = (e) => {
    e.preventDefault();
    const newDetails = {
      name: name,
    };
    axios.patch(`/api/resource/detail/${id}`, newDetails).then(() => {
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
          paddingRight={370}
          marginRight={300}
        >
          <FormControl isRequired>
            <FormLabel htmlFor="name">Resource Name</FormLabel>
            <Input
              id="name"
              placeholder="Resource Name"
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
            Save
          </Button>
          <AlertDialog isOpen={isOpen} onClose={onClose}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Edit Resource
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? to update this resource.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button colorScheme="orange" onClick={editHandler} ml={3}>
                    Update
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
