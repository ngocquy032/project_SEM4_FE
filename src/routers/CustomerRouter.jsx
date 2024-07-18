import React, { Fragment } from 'react'
import Header from '../views/Customers/components/header'
import Footer from '../views/Customers/components/footer'
import { Route, Routes } from 'react-router-dom'
import Home from "../views/Customers/pages/home";
import Login from '../views/Customers/pages/login';
import MasterLayout from '../views/Customers/components/masterLayout';
import About from '../views/Customers/pages/about';


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