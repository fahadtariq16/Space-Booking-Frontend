import { React, useState, useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Image, Input, Button, Link } from "@chakra-ui/react";
import source from "../../logo-2.png";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel } from "@chakra-ui/react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userArray, setuserArray] = useState([]);

  useEffect(() => {
    axios.get("/api/user/userrole/role").then((response) => {
      setuserArray(response.data);
    });
    if (localStorage.getItem("authToken")) {
      userArray.map((userData) => {
        if (userData.email === email) {
          const userRole = userData.role;
          const userID = userData._id;
          localStorage.setItem("Role", userRole);
          localStorage.setItem("UserID", userID);
          if (userRole === "Client") {
            navigate("/clientdashboard");
          } else if (userRole === "Admin") {
            navigate("/admindashboard");
          } else if (userRole === "Null") {
            alert("Kindly Register Your Account");
          }
        }
        return true;
      });
    }
  }, [flag, email, userArray, navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );
      localStorage.setItem("authToken", data.token);
      setFlag(true);
      // if (email === "telhawasim@gmail.com") {
      //   window.location.href = "/adminDashboard";
      //   localStorage.setItem("AdminEmail", email);
      //   localStorage.setItem("Role", "Admin");
      // }
    } catch (error) {
      alert("User Not Found Kindly Register");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={60}
        paddingTop={50}
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
          {error && <span>{error}</span>}
        </GridItem>
        <GridItem w="100%" h="10" bg="white.500" />
      </Grid>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={80}
        paddingTop={100}
        paddingBottom={3}
        paddingLeft={20}
        paddingRight={10}
      >
        <GridItem w="100%" h="10" bg="white.500" />
        <form onSubmit={loginHandler}>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Enter Email</FormLabel>
            <Input
              id="email"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel htmlFor="password" paddingTop={5}>
              Enter Password
            </FormLabel>
            <Input
              type="password"
              id="password"
              placeholder="Enter Password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="orange"
            variant="solid"
            w="20"
            h="30"
            marginTop={5}
            marginLeft={20}
            marginRight={20}
          >
            Login
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
            paddingLeft={168}
          >
            Register
          </Link>
        </GridItem>
      </Grid>
    </>
  );
};

export default Login;
