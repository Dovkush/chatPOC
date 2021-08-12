import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import Room from './Room';
import ChatList from './ChatList';
const Chatroom = (props) => {
  const { userEmail } = props;
  const [roomId, setRoomId] = useState();

  return (
    <>
    { roomId ? (
        <Room setRoomId={setRoomId}></Room>
      ) : (
        <ChatList
          setRoomId={setRoomId}
          userEmail={userEmail}
        ></ChatList>
      )}
    </>
  );
};

export default Chatroom;