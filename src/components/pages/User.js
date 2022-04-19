import { React, useState, useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import axios from "axios";
import "./User.css";
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
      <User />
    </Box>
  );
}

const User = () => {
  const [user, setUser] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    axios.get("/api/user").then((response) => {
      setTimeout(() => {
        setUser(response.data);
        setLoader(true);
      }, 1000);
    });
  }, [user]);

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
            <GridItem w="100%" h="10" bg="white.500" paddingRight={680}>
              <Heading as="h2" size="xl" color="orange">
                Users
              </Heading>
            </GridItem>
            <GridItem w="100%" h="10" bg="white.500"></GridItem>
          </Grid>
          <Grid templateColumns="repeat(3, 1fr)" gap={5}>
            <GridItem w="100%" h="10" bg="white.500" />
            <GridItem
              w="100%"
              h="10"
              bg="white.500"
              paddingRight={240}
              marginRight={310}
              paddingTop={25}
            >
              <TableContainer
                style={{ border: "1px solid gray", borderRadius: "10px" }}
              >
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Select</Th>
                      <Th>User Name</Th>
                    </Tr>
                  </Thead>
                  {user.map((u, key) => {
                    return (
                      <Tbody key={key}>
                        <Tr>
                          <Td>
                            <Checkbox
                              colorScheme="red"
                              style={{ paddingLeft: "15px" }}
                            ></Checkbox>
                          </Td>
                          <Td>{u.name}</Td>
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
