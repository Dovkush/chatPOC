import React from 'react';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';

const ChatList = (props) => {
  const userChat = [
    { roomId: '3123', email: 'suafbfuasbf', timestamp: Date.now(), read: true },
    {
      roomId: '3123',
      email: 'suafbfuasbf',
      timestamp: Date.now(),
      read: false,
    },

    {
      roomId: '3123',
      email: 'suafbfuasbf',
      timestamp: Date.now(),
      read: false,
    },
    {
      roomId: '3123',
      email: 'suafbfuasbf',
      timestamp: Date.now(),
      read: false,
    },

    {
      roomId: '3123',
      email: 'suafbfuasbf',
      timestamp: Date.now(),
      read: false,
    },
    {
      roomId: '3123',
      email: 'suafbfuasbf',
      timestamp: Date.now(),
      read: false,
    },

    {
      roomId: '3123',
      email: 'suafbfuasbf',
      timestamp: Date.now(),
      read: false,
    },
    {
      roomId: '3123',
      email: 'suafbfuasbf',
      timestamp: Date.now(),
      read: false,
    },

    {
      roomId: '3123',
      email: 'suafbfuasbf',
      timestamp: Date.now(),
      read: false,
    },
    {
      roomId: '3123',
      email: 'suafbfuasbf',
      timestamp: Date.now(),
      read: false,
    },

    {
      roomId: '3123',
      email: 'suafbfuasbf',
      timestamp: Date.now(),
      read: false,
    },
  ];
return (
    <>
      <Box maxWidth="50vw" h="100vh" m="auto" border={'1px solid lightgrey'}>
        <Flex h="8vh" direction="rtl">
          <Button colorScheme="blue" m="1rem 0  1rem 2rem">
            Logout
          </Button>
        </Flex>
        <Flex
          direction="column"
          alignItems="center"
          h="92vh"
          overflow='auto'
        >
          {userChat.map((chatData) => {
            return (
              <Flex
                justifyContent="space-between"
                alignItems="center"
                bg="lightgray"
                h="90px"
                w="90%"
                borderRadius="xl"
                mb="0.5rem"
                cursor="pointer"
                onClick={() => props.setRoomId(chatData.roomId)}
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
                    backgroundColor="black"
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