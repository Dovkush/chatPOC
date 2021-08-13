import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from "react-router-dom"
import { Box, Button, Flex, Heading, Text, Image } from '@chakra-ui/react';
import axios from 'axios';
import { RequestContext } from '../context/RequestProvider';
import { serverUrl } from "../constants";
import { GetPrototypeFromConstructor } from 'es-abstract';
import moment from 'moment';
const ChatList = (props) => {
  const history = useHistory();
  const [userChat, setUserChat] = useState([]);
  const { userId, socket, username, setUserId, setusername } = useContext(RequestContext);
  console.log(socket, userId);
  useEffect(() => {
    // console.log(window.localStorage.getItem('userdata'),userId,username) 
    if (!window.localStorage.getItem('userdata')) {
      logout()
    }
  }, [])
  const logout = () => {
    window.localStorage.removeItem("userdata")
    setUserId(null)
    setusername(null)
    props.history.push("/");
  };
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      if (!userId) {
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
    if (socket) {
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
    }
  }, [userId, socket]);

  console.log(users);

  const goToRoom = (email, roomId) => {
    history.push({
      pathname: '/chat',
      state: { roomId, email }
    });
  }
  return (
    <>
      <Box maxWidth={["100%", "50%"]} h="100vh" m="auto" border={'1px solid lightgrey'}>
        <Flex p="0.5rem" display="flex" justifyContent="space-between" alignItems="center" bgColor="blue.800">
          <Text color="white" fontWeight="semibold" fontSize="xl" >{username}</Text>

          <Button colorScheme="red" onClick={logout}>
            Logout
          </Button>
        </Flex>

        <Flex
          direction="column"
          alignItems="center"
          h="92vh"
          overflow='auto'
          backgroundColor="lightgray"
          backgroundPosition="center"
        >
          {users.map((chatData) => {
            console.log(chatData);
            return (
              <Flex
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                h="90px"
                w="100%"
                style={{ textDecoration: 'none' }}
                bgColor={!chatData.read ? "white" : "gray.100"}
                border="1px solid lightgray"
                cursor="pointer"
                onClick={() => goToRoom(chatData.email, chatData.roomID)}
              >
                <Flex ml="1rem" p="0.5rem">
                  <Image src={`https://avatars.dicebear.com/api/gridy/${chatData.roomID}.svg`}
                    h="50%" w="10%" mr="3"
                  ></Image>
                  <Text size="lg" fontWeight="semibold">
                    {chatData.email}
                  </Text>
                </Flex>
                <Flex alignItems="flex-end" h="100%" >
                  <Text fontSize="0.6rem" fontWeight="400" w="50px">{moment(chatData.updatedAt).format("LT")}</Text>
                </Flex>
                {/* {!chatData.read ? (
                  <Box
                    w="1rem"
                    h="1rem"
                    borderRadius="50%"
                    backgroundColor="blue"
                    mr="2rem"
                  ></Box>
                ) : (`
                  <></>
                )} */}
              </Flex>
            );
          })}
        </Flex>
      </Box>
    </>
  );
};

export default ChatList;