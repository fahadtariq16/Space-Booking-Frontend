import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import axios from "axios";
import { EditIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import "./Resource.css";
import { Skeleton, Checkbox } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
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
      <Resource />
    </Box>
  );
}

const Resource = () => {
  const [resource, setResource] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/resource").then((response) => {
      setTimeout(() => {
        setResource(response.data);
        setLoader(true);
      }, 1000);
    });
  }, [resource]);

  const editbtn = (id) => {
    navigate(`/resourceDetail/${id}`);
  };

  const addbtn = () => {
    navigate("/addResource");
  };

  return (
    <>
      {loader === false ? (
        <>
          <Skeleton
            height="20px"
            marginLeft={250}
            marginBottom={5}
            width="100%"
            speed={0.5}
          />
          <Skeleton
            height="20px"
            marginLeft={250}
            marginBottom={5}
            width="100%"
            speed={0.5}
          />
          <Skeleton
            height="20px"
            marginLeft={250}
            width="100%"
            speed={0.5}
            marginBottom={5}
          />
          <Skeleton
            height="20px"
            marginLeft={250}
            width="100%"
            speed={0.5}
            marginBottom={5}
          />
          <Skeleton height="20px" marginLeft={250} width="100%" speed={0.5} />
        </>
      ) : (
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
            <GridItem w="100%" h="10" bg="white.500">
              <DeleteIcon
                className="deleteicon"
                style={{ marginLeft: "420px", marginTop: "10px" }}
              />
            </GridItem>
            <GridItem w="100%" h="10" bg="white.500"></GridItem>
          </Grid>
          <Grid templateColumns="repeat(3, 1fr)" gap={5}>
            <GridItem w="100%" h="10" bg="white.500" />
            <GridItem
              w="100%"
              h="10"
              bg="white.500"
              paddingRight={160}
              marginRight={240}
            >
              <TableContainer
                style={{ border: "1px solid gray", borderRadius: "10px" }}
              >
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Select</Th>
                      <Th>Resource Type Name</Th>
                      <Th>Edit</Th>
                    </Tr>
                  </Thead>
                  {resource.map((r, key) => {
                    return (
                      <Tbody key={key}>
                        <Tr>
                          <Td>
                            <Checkbox
                              colorScheme="red"
                              style={{ paddingLeft: "15px" }}
                            ></Checkbox>
                          </Td>
                          <Td>
                            <div style={{ paddingLeft: "10px" }}>{r.name}</div>
                          </Td>
                          <Td>
                            <div style={{ paddingLeft: "10px" }}>
                              <EditIcon
                                onClick={() => editbtn(r._id)}
                                className="editicon"
                              />
                            </div>
                          </Td>
                        </Tr>
                      </Tbody>
                    );
                  })}
                </Table>
              </TableContainer>
            </GridItem>
            <GridItem w="100%" h="10" bg="white.500" />
          </Grid>
        </>
      )}
    </>
  );
};
