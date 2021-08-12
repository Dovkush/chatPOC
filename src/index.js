import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from "@chakra-ui/react"
import RequestProvider from './context/RequestProvider';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.render(
 <BrowserRouter>
  <RequestProvider>
  <ChakraProvider>
     <App/>
  </ChakraProvider>
  </RequestProvider>
 </BrowserRouter>
 
  
  ,
  document.getElementById('root')
);

axios.defaults.baseURL = "https://pep-chat.herokuapp.com"

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
