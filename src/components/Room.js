import { Box, Button, Flex, Heading, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom"
import { RequestContext } from '../context/RequestProvider';
import Message from "./Message";


function Room(props) {
  const [input, setInput] = useState("");
  const history = useHistory();
  const { roomId, email } = history.location.state
  const [msgData, setMsgData] = useState([])
  const { socket, userId } = useContext(RequestContext)
  
  const onBack = () => {
    props.history.push('/rooms');
  };

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
        maxWidth="50vw"
        h="100vh"
        m="auto"
        border={'1px solid lightgrey'}
      >
        <Box m="1rem" h="8vh" flex="0.1">
          <Heading></Heading>
          <Button onClick={onBack} bg='lightblue'> Back</Button>
        </Box>
        <Flex flex="1" w="90%" h="%" margin="auto" flexDir="column" overflow="auto" 
        >
          <Box flex="1" overflow="auto">
              <Flex flex="1" flexDir="column" >
                 {msgData.map((msgData)=>{
                     return(
                          <Message msgData ={msgData}></Message>
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
              minW='85%'
              mr='10px'
              value={input}
              onChange={(e) => {
                setInput(e.target.value );
              }}
            ></Input>
            <Button colorScheme="blue" onClick={sendMessage}>
              Send
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Room;
