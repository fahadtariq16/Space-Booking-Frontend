import { React, useState } from "react";
import { Grid, GridItem, Radio, RadioGroup } from "@chakra-ui/react";
import {
  Image,
  Input,
  FormControl,
  FormLabel,
  Button,
  Link,
} from "@chakra-ui/react";
import source from "../../logo-2.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  let handleRole = (e) => {
    setRole(e.target.value);
  };

  const registerSubmit = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post(
        "/api/auth/register",
        { name, email, password, role },
        config
      );
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
    alert("User Register Successfully");
    navigate("/login");
  };

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={60}
        paddingTop={30}
        paddingBottom={100}
      >
        <GridItem w="100%" h="10" bg="white.500" />
        <GridItem w="100%" h="10">
          <Image
            src={source}
            alt="Dan Abramov"
            w="200"
            h="200"
            paddingLeft={70}
          />
          {error && <span className="error-message">{error}</span>}
        </GridItem>
        <GridItem w="100%" h="10" bg="white.500" />
      </Grid>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={80}
        paddingTop={20}
        paddingBottom={3}
        paddingLeft={20}
        paddingRight={10}
      >
        <GridItem w="100%" h="10" bg="white.500" />
        <form onSubmit={registerSubmit}>
          <FormControl isRequired>
            <FormLabel htmlFor="name">Enter Name</FormLabel>
            <Input
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
            />
            <FormLabel htmlFor="email" paddingTop={5}>
              Enter Email
            </FormLabel>
            <Input
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            <FormLabel htmlFor="password" paddingTop={5}>
              Enter Password
            </FormLabel>
            <Input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
          </FormControl>
          <RadioGroup>
            <Radio
              size="sm"
              name="user"
              colorScheme="orange"
              paddingTop={5}
              paddingLeft={10}
              paddingRight={50}
              type="radio"
              id="client"
              value="Client"
              onChange={handleRole}
            >
              Client
            </Radio>
            <Radio
              size="sm"
              name="user"
              colorScheme="orange"
              paddingTop={5}
              type="radio"
              id="admin"
              value="Admin"
              onChange={handleRole}
            >
              Admin
            </Radio>
          </RadioGroup>
          <Button
            colorScheme="orange"
            variant="solid"
            w="20"
            h="30"
            marginTop={5}
            marginLeft={20}
            marginRight={20}
            type="submit"
          >
            Register
          </Button>
        </form>
        <GridItem w="100%" h="10" bg="white.500" />
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)" gap={10} paddingBottom={5}>
        <GridItem w="100%" h="10" bg="white.500" />
        <GridItem w="100%" h="10" bg="white.500" paddingLeft={10}>
          <Link
            onClick={handleClick}
            color="orange"
            paddingTop={1}
            paddingLeft={172}
          >
            Login
          </Link>
        </GridItem>
      </Grid>
    </>
  );
};

export default Register;
