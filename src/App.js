import React, { useState } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import Login from './components/Login';
import Chatroom from './components/ChatRoom';
import Chat from './components/ChatList';

const App = () => {
  // 1 -> login page
  // 2 -> chat room
  // 3 -> chat message
  const [pageNo, setPageNo] = useState(1);

  return (
    <>
      <ChakraProvider>
        {pageNo == 1 ? (
          <Login setPageNo={setPageNo} />
        ) : <Chatroom setPageNo={setPageNo}></Chatroom>
        }
      </ChakraProvider>
    </>
  );
};

export default App;