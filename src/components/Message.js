import { Box,Flex,Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import moment from 'moment';
import { RequestContext } from '../context/RequestProvider';
const Messages = (props) => {
    const { msgData } = props;
    let email="nav";
    let time=moment(msgData.createdAt).format('LT');
    const { userId } = useContext(RequestContext)
  return (
    <>
        <Flex align-item='flex-end' mb='10px'  display="flex" flexDirection={msgData.from==userId?"row-reverse":"row"}
        > 
            <Box  maxWidth="400px" p="10px" borderRadius="15px" 
            backgroundColor={msgData.from==userId?"#006AFF":"lightgrey"} 
            color={msgData.from==userId?"white":"black"} display="flex" >
                <Flex direction="column" alignItem="center" alignContent="center" justifyContent="space-between" m='10px'
                 >
                    <Box mr="10px" fontWeight="bold" wordBreak='break-all'>{msgData.msg}</Box>
                    <Box fontSize="0.8rem" minW='40px'>{time}</Box>
                </Flex>
            </Box>
        </Flex>
    </>
);
};

export default Messages;
