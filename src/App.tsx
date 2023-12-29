import React from 'react';
import ButtonCount from './buttonCounter';
import { Button, Space, DatePicker, version } from 'antd';
import LoginPage from './Login-page';
import MyProfile from './my-profile/myProfile';
import EmployeeDetails from './Emplyee-Details/employee';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home/home';
import  Header  from './header/header';
import Register from './register/register';


const App = () => (
  <>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/employee-details" element={<EmployeeDetails />} />
        <Route  path='/register' element={<Register />}/>
      </Routes>
    </BrowserRouter>
  </>
);

export default App;