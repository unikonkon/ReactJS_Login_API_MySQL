import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import PageLogin from './component/page_login';
import User from './component/user';
import PageSignUp from './component/page_signUp';
import {
  BrowserRouter,Route,Routes,  
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>

  <Routes>
    <Route path="/" element={ <PageLogin />}/>
    <Route path="/user" element={ <User />}/>
    <Route path="/register" element={ <PageSignUp />}/>
  </Routes>
   
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
