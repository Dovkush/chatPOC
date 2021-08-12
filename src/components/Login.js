import { Button, Input, Box } from '@chakra-ui/react';
import React, { useState } from 'react';

const Login = (props) => {
  const { setPageNo } = props;
  const [email, setEmail] = useState('');

  const onSubmit = () => {
    setPageNo(2);
  };
  return (
    <div
      className="login_container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',

      }}
    >
      <Box w="50%" p={4} border={"1px solid lightgrey"}>
        <Input
          placeholder="Email"
          size="md"
          mb="2rem"

          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button colorScheme="blue" onClick={onSubmit}>
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Login;