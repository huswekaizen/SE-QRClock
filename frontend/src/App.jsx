import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/loginPage'
import AdminPage from './pages/admin-page'
import AdminPageEmployees from './pages/admin-page-employees';
import EmployeePage from './pages/employee-page'
import AdminLayout from './layouts/admin-layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="employees" element={<AdminPageEmployees />} />
        </Route>

        <Route path="/employee" element={<EmployeePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
