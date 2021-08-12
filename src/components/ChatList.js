import React, { useEffect ,useContext,useState} from 'react';
import  { useHistory } from "react-router-dom"
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';
import { RequestContext } from '../context/RequestProvider';
import {serverUrl} from "../constants";
import { GetPrototypeFromConstructor } from 'es-abstract';
const ChatList = (props) => {
  const history=useHistory();
 const[userChat,setUserChat]=useState([]);
  const {userId,socket}= useContext(RequestContext);
 console.log(socket,userId);
  const logout = () => {
      props.history.push("/");
  };
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      if(!userId){
        return;
      }
      const response = await axios.get(`/users/${userId}`);
      console.log(response.data);

      setUsers(
        response.data.map((user) => {
          return {
            ...user,
            hasNewMessage: !user.read,
          };
        })
      );
    })();
  }, [userId, socket]);
  useEffect(() => {
    socket.on("get-message", (data) => {
      const { from, to, msg, roomID } = data;
      setUsers((prev) => {
        return prev.map((user) => {
          if (user._id === from) {
            return {
              ...user,
              hasNewMessage: true,
            };
          }
          return user;
        });
      });
    });
  }, []);
  console.log(users);
  
  const goToRoom=(email,roomId)=>{
    history.push({
      pathname: '/chat',
      state: { roomId, email }
    });
  }
return (
    <>
      <Box maxWidth="50vw" h="100vh" m="auto" border={'1px solid lightgrey'}>
        <Box backgroundColor="#4299E1" height="5rem" borderShadow="gray">
        <Flex h="8vh"  display="flex" justifyContent="center">
        <Box fontWeight="bold" fontSize="45px" >ROOMS</Box>
          <Button colorScheme="red" m="1rem 0  2rem 2rem" onClick={logout}>
            Logout
          </Button>
         
        </Flex>
        </Box>

        <Flex
          direction="column"
          alignItems="center"
          h="92vh"
          overflow='auto'
         backgroundColor="lightgray"
          backgroundPosition="center"
        >
          {users.map((chatData) => {
            return (
              <Flex
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                h="90px"
                w="90%"
                 style={{ textDecoration: 'none' }} 
                mt="0.5rem"
                borderRadius="xl"
                border="1px solid lightgray"
                mb="0.5rem"
                cursor="pointer"
                onClick={() => goToRoom(chatData.email,chatData.roomID)}
              >
                <Box ml="1rem">
                  <Heading as="h3" size="lg" m=".5rem">
                    {chatData.email}
                  </Heading>
                  <Text m="0.5rem">{chatData.timestamp}</Text>
                </Box>
                {chatData.read ? (
                  <Box
                    w="1rem"
                    h="1rem"
                    borderRadius="50%"
                    backgroundColor="blue"
                    mr="2rem"
                  ></Box>
                ) : (
                  <></>
                )}
              </Flex>
            );
          })}
        </Flex>
      </Box>
    </>
  );
};

export default ChatList;