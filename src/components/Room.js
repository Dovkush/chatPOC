import { Box, Button, Flex, Heading, Input, InputGroup, InputRightAddon, InputRightElement } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from "react-router-dom"
import { RequestContext } from '../context/RequestProvider';
import Message from "./Message";
import "./Room.css"

function Room(props) {
  const [input, setInput] = useState("");
  const history = useHistory();
  const { roomId, email } = history.location.state
  const [msgData, setMsgData] = useState([])
  const { socket, userId } = useContext(RequestContext)

  const onBack = () => {
    props.history.push('/rooms');
  };
  const scrollRef = useRef()
  useEffect(() => {
    (async () => {
      const response = await axios.get(`/message/${roomId}`)
      console.log(roomId)
      setMsgData(response.data)
      console.log(response.data);
      // setMessages(
      //   response.data.map((message) => {
      //     return {
      //       text: message.msg,
      //       type: message.from === user._id ? "sent" : "received",
      //     };
      //   })
      // );
    })();
  }, []);

  useEffect(() => {
    scrollRef.current.scrollIntoView()
  }, [msgData])
  const sendMessage = () => {
    const text = input;
    console.log(text);
    setInput("");
    if (text) {

      socket.emit("send-message", {
        from: userId,
        roomID: roomId,
        msg: text,
      });

      setMsgData((prev) => {

        return [...prev, { msg: text, from: userId }];

      });

    }
  };

  useEffect(() => {
    socket.on("get-message", (data) => {
      if (scrollRef.current)
        scrollRef.current.scrollIntoView()
      console.log(data);
      const { from, to, msg, roomID } = data;
      setMsgData((prev) => [
        ...prev,
        {
          msg: msg,
          from
        },
      ]);
    });
  }, []);

  return (
    <>
      <Flex
        flexDir="column"
        w={["100%", "50%"]}
        h="100vh"
      >
        <Box m="1rem" h="8vh" flex="0.1">
          <Heading></Heading>
          <Button onClick={onBack} colorScheme="blue"> Back</Button>
        </Box>
        <Flex flex="1" flexDir="column"

          w="100vw" h="80vw"
          marginBottom="20px">
          <Box flex="1" overflow="auto" maxH="80vh" maxW="100vw"

          >
            <Flex maxH="80vh" maxW="100vw" flexDir="column" pl="2" pr="2" overflowX="hidden">
              {msgData.map((msgData) => {
                return (
                  <Message key={JSON.stringify(msgData)} msgData={msgData}></Message>
                )
              })

              }
              <div ref={scrollRef} style={{ height: "0" }}></div>
            </Flex>
          </Box>
          <Flex justifyContent="center">
            <InputGroup
              w="90%"
            >
              <Input
                maxH="40px"
                placeholder="Type a Message"
                type="text"
                mb="4"

                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}

              ></Input>
              <InputRightElement w="2rem">
                <Button colorScheme="blue" onClick={sendMessage}>
                  Send
                </Button>
              </InputRightElement>
            </InputGroup>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Room;
