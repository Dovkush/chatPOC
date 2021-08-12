import React, { useContext, useEffect, useState } from 'react';
import {serverUrl} from "./constants";
import { ChakraProvider } from '@chakra-ui/react';
import Login from './components/Login';

import Chat from './components/ChatList';
import axios from 'axios';
import RequestProvider, { RequestContext } from './context/RequestProvider';
import { io } from 'socket.io-client';
// import Messages from './components/Message';
import Room from './components/Room';
import { Route, Switch } from 'react-router-dom';
import ChatList from './components/ChatList';

const App = () => {
  // 1 -> login page
  // 2 -> chat room
  // 3 -> chat message
  const [pageNo, setPageNo] = useState(1);
  const {socket,setSocket}=useContext(RequestContext);
  useEffect(()=>{
    const socket = io(serverUrl);
    socket.on("connect", () => {
      console.log("you connected with id : " + socket.id);
    });
    socket.on("room-joined", (data) => {
      console.log("room-joined");
      console.log(data);
    });
    setSocket(socket);
  },[])
  return (
   
    <ChakraProvider>

     <Switch>
       <Route path="/rooms" exact component={ChatList}></Route>
       <Route path="/chat" exact component={Room}></Route>
       <Route path="/"  exact component={Login}></Route>
     </Switch>
      </ChakraProvider>
    
     
  );
};

// const ProtectedRoute = () = >{
//  
// }

export default App;