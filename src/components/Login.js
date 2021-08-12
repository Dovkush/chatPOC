import { Button, Input, Box } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState ,useContext} from 'react';
import { RequestContext } from '../context/RequestProvider';

const Login = (props) => {
  const {userId,setUserId,socket,setSocket}=useContext(RequestContext);
  // console.log(userId,setUserId);
  // console.log(userId);
  const [userEmail, setUserEmail] = useState("");
  const onSubmit = () => {
    axios.post("/user/create", {
      email: userEmail
    }).then(({data})=>{
      console.log(data._id)
        setUserId(data._id);
        socket.emit("join", data._id);

    })
 
    .catch(console.error);
    props.history.push("/rooms");
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
            setUserEmail(e.target.value);
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