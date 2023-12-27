import React from 'react';
import ButtonCount from './buttonCounter';
import { Button, Space, DatePicker, version } from 'antd';
import LoginPage from './Login-page';
import MyProfile from './my-profile/myProfile';
import EmployeeDetails from './Emplyee-Details/employee';
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/employee-details" element={<EmployeeDetails />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;