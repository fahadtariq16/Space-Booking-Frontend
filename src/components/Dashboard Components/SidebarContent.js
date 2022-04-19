import React from "react";
import NavItem from "./NavItem";
import { useNavigate } from "react-router-dom";
import source from "../../logo-2.png";
import {
  Flex,
  Box,
  useColorModeValue,
  Text,
  Image,
  CloseButton,
} from "@chakra-ui/react";

import { FiBriefcase, FiBookOpen, FiBook, FiUser } from "react-icons/fi";

const LinkItems = [
  { name: "Location", icon: FiBriefcase, src: "/location" },
  { name: "Resouce Type", icon: FiBookOpen, src: "/resourceType" },
  { name: "Resource", icon: FiBook, src: "/resource" },
  { name: "User", icon: FiUser, src: "/user" },
];

const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate();
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
          <Image
            src={source}
            alt="Dan Abramov"
            w="50"
            h="50"
            onClick={() => navigate("/admindashboard")}
          />
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

export default SidebarContent;
