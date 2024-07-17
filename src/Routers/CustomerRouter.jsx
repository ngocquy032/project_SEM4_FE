import React, { Fragment } from 'react'
import Header from '../Views/Customers/Pages/Header'
import Footer from '../Views/Customers/Pages/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from "../Views/Customers/Components/Home";
import Login from '../Views/Customers/Components/Login';
import MasterLayout from '../Views/Customers/Pages/MasterLayout';
import About from '../Views/Customers/Components/About';


const CustomerRouter = () => {
  return (
    <Routes>


      {/* components không có header và footer */}
      <Route path='/login' element={<Login />} />
      
      {/* components có chung header và footer */}
      <Route path='/' element={<MasterLayout />}>
        <Route index element={<Home />} />
        <Route path='/about' element={<About />} />


        <Route path='*' element={<div>404 Not Found</div>} />
      </Route>

    </Routes>
  )
}

export default CustomerRouter