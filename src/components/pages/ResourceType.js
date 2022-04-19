import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import { Heading, Button } from "@chakra-ui/react";
import { EditIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons";
import "./ResourceType.css";
import { Skeleton, Checkbox } from "@chakra-ui/react";
import axios from "axios";
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
      <ResourceType />
    </Box>
  );
}

const ResourceType = () => {
  const navigate = useNavigate();
  const [resourceType, setResourceType] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    axios.get("/api/resourceType").then((response) => {
      setTimeout(() => {
        setResourceType(response.data);
        setLoader(true);
      }, 1000);
    });
  }, [resourceType]);

  const editbtn = (id) => {
    navigate(`/ResourceTypeDetail/${id}`);
  };

  const addbtn = () => {
    navigate("/addResourceType");
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
            <GridItem
              w="100%"
              h="10"
              bg="white.500"
              paddingRight={150}
              marginRight={450}
            >
              <Heading as="h2" size="xl" color="orange">
                Resources Type
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
                  Add Resource Type
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
            <GridItem w="100%" h="10" bg="white.500"></GridItem>
            <GridItem w="100%" h="10" bg="white.500">
              <DeleteIcon
                className="deleteicon"
                style={{ marginLeft: "20px", marginTop: "10px" }}
              />
            </GridItem>
          </Grid>
          <Grid templateColumns="repeat(3, 1fr)" gap={5}>
            <GridItem w="100%" h="10" bg="white.500" />
            <GridItem
              w="100%"
              h="10"
              bg="white.500"
              paddingRight={100}
              marginRight={300}
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
                  {resourceType.map((rt, key) => {
                    return (
                      <Tbody key={key}>
                        <Tr>
                          <Td>
                            <Checkbox
                              colorScheme="red"
                              style={{ paddingLeft: "15px" }}
                            ></Checkbox>
                          </Td>
                          <Td>{rt.name}</Td>
                          <Td>
                            <div style={{ paddingLeft: "10px" }}>
                              <EditIcon
                                onClick={() => editbtn(rt._id)}
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
