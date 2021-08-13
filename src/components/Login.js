import { Button, Input, Box, Flex, Heading } from '@chakra-ui/react';

import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { RequestContext } from '../context/RequestProvider';

const Login = (props) => {
  const { userId, setUserId, socket, setSocket, setusername, username } = useContext(RequestContext);
  // console.log(userId,setUserId);
  // console.log(userId);
  const [userEmail, setUserEmail] = useState("");

  const onSubmit = () => {
    if (userEmail == "") {
      alert("please enter valid email Id");
      return;
    }
    axios.post("/user/create", {
      email: userEmail
    }).then(({ data }) => {
      console.log(data._id)
      setUserId(data._id);
      setusername(userEmail)
      socket.emit("join", data._id);

    })

      .catch(console.error);
    props.history.push("/rooms");
  };
  return (
    <Flex
      className="login_container"
      justifyContent="center"
      alignItems="center"
      w="100%"
      h="100vh"
    >
      <Flex m="4" w={["100%", "50%"]} flexDir="column" alignItems="center" p={4} >
        <Heading
          mb="1rem"
        > Login </Heading>
        <Input
          placeholder="Email"
          size="md"
          mb="1rem"

          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />
        <Button colorScheme="blue" onClick={onSubmit}>
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;