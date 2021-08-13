
import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import moment from 'moment';
import { RequestContext } from '../context/RequestProvider';
const Messages = (props) => {
    const { msgData } = props;
    let email = "nav";
    let time = moment(msgData.createdAt).format('LT');
    const { userId } = useContext(RequestContext)
    return (
        <>
            <Flex alignItem='flex-end' mb='10px' display="flex" flexDirection={msgData.from == userId ? "row-reverse" : "row"}
            >
                <Box maxWidth={["70vw", "350px"]} borderRadius="10px"
                    backgroundColor={msgData.from == userId ? "#006AFF" : "lightgrey"}
                    color={msgData.from == userId ? "white" : "black"} display="flex" >
                    <Flex direction="row" alignItem="center" alignContent="center" justifyContent="space-between"
                    >
                        <Flex h="100%" m="1" mb="1">
                            <Box mr="10px" fontWeight="bold" wordBreak='break-all'>{msgData.msg}</Box>
                        </Flex>
                        <Flex h="100%" alignItems="flex-end" mr="2">
                            <Text fontSize="0.6rem" fontWeight="300">{time}</Text>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
};

export default Messages;
