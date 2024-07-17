import React, { Fragment } from 'react'
import Header from '../views/Customers/pages/header'
import Footer from '../views/Customers/pages/footer'
import { Route, Routes } from 'react-router-dom'
import Home from "../views/Customers/components/home";
import Login from '../views/Customers/components/login';
import MasterLayout from '../views/Customers/pages/masterLayout';
import About from '../views/Customers/components/about';


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