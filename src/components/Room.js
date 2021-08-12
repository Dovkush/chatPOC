import { Box, Button, Flex, Heading, Input } from '@chakra-ui/react';
import React from 'react';

function Room(props) {
  const { roomId, userEmail } = props;
  const msgData = [
    {
      from: 'nav',
      to: 'dove',
      msg: 'Hi',
      time: Date.now(),
    },
    {
      from: 'nav',
      to: 'dove',
      msg: 'Hi',
      time: Date.now(),
    },
    {
      from: 'nav',
      to: 'dove',
      msg: 'Hi',
      time: Date.now(),
    },
    {
      from: 'nav',
      to: 'dove',
      msg: 'Hi',
      time: Date.now(),
    },
  ];
  return (
    <>
      <Flex
        flexDir="column"
        maxWidth="50vw"
        h="100vh"
        m="auto"
        border={'1px solid lightgrey'}
      >
        <Box m="1rem" h="8vh" flex="0.1">
          <Heading>{userEmail}</Heading>
          <Button> Back</Button>
        </Box>
        <Flex flex="1" w="90%" h="%" margin="auto" flexDir="column">
          <Box flex="1">
              <Flex flex="1" flexDir="column">
                 {msgData.map((msgData)=>{
                     return(
                          <Box >{msgData.msg}</Box>
                     )
                 })

                 }
              </Flex>
          </Box>
          <Flex>
            <Input
              flex="0.2"
              maxH="40px"
              placeholder="Type a Message"
              type="text"
              mb="4"
            ></Input>
            <Button colorScheme="blue">
              Send
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Room;
