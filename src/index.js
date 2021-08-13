import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react"
import RequestProvider from './context/RequestProvider';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.render(
   <BrowserRouter>
      <RequestProvider>
         <ChakraProvider>
            <App />
         </ChakraProvider>
      </RequestProvider>
   </BrowserRouter>


   ,
   document.getElementById('root')
);

axios.defaults.baseURL = "https://pep-chat.herokuapp.com"

