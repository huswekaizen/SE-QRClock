import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/loginPage'
import EmployeeDeviceRegistrationPage from './pages/employee-device-registration-page'
import AdminPageHome from './pages/admin-page-home'
import AdminPageEmployees from './pages/admin-page-employees';
import AdminLayout from './layouts/admin-layout';
import AdminPageAttendance from "./pages/admin-page-attendance";
import AdminPageGenerateQR from "./pages/admin-page-generate-qr";
import AdminPageReports from "./pages/admin-page-reports";
import AdminPageSettings from "./pages/admin-page-settings";
import EmployeePage from './pages/employee-page'
import EmployeeDeviceAlreadyRegistered from './pages/employee-device-already-registered';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPageHome />} />
          <Route path="employees" element={<AdminPageEmployees />} />
          <Route path="attendance" element={<AdminPageAttendance />} />
          <Route path="generate-qr" element={<AdminPageGenerateQR />} />
          <Route path="reports" element={<AdminPageReports />} />
          <Route path="settings" element={<AdminPageSettings />} />
        </Route>
        
        <Route path="/employee-device-registration" element={<EmployeeDeviceRegistrationPage />} />
        <Route path="/employee-device-already-registered" element={<EmployeeDeviceAlreadyRegistered />} />
        <Route path="/employee" element={<EmployeePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
