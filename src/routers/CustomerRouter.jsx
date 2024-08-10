import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import BookAppoinment from '../views/Customers/components/bookAppoinment';
import MasterLayout from '../views/Customers/components/masterLayout';
import About from '../views/Customers/pages/about';
import Department from "../views/Customers/pages/department";
import Home from "../views/Customers/pages/home";
import Login from '../views/Customers/pages/login';
// import '../styleCustomers.css'
import ScrollTop from '../scrollTop';
import Account from "../views/Customers/pages/account";
import Contact from "../views/Customers/pages/contact";
import DepartmentDetails from "../views/Customers/pages/departmentDetails"
import Doctors from '../views/Customers/pages/doctors';
import Register from "../views/Customers/pages/register";
import Service from '../views/Customers/pages/service';
import BookingForm from '../views/Customers/components/bookingForm';
import Blog from'../views/Customers/pages/blog'
import DoctorDetails from '../views/Customers/pages/doctorDetails';




const CustomerRouter = () => {
  return (
    <>
    <ScrollTop />
    <Routes>


      {/* components không có header và footer */}


      {/* components có chung header và footer */}
      <Route path='/' element={<MasterLayout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route index element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/bookAppoinment' element={<BookAppoinment />} />
        <Route path='/doctors' element={ <Doctors/>}/>
        <Route path='/contact' element={ <Contact/>}/>
        <Route path='/department' element={ <Department/>}/>
        <Route path='/account' element={ <Account/>}/>
        <Route path='/service' element={ <Service/>}/>
        <Route path='/departmentDetails' element={ <DepartmentDetails/>}/>
        <Route path='/bookingForm' element={ <BookingForm/>}/>
        <Route path='/blog' element={ <Blog/>}/>
        <Route path='/doctorDetails' element={ <DoctorDetails/>}/>







        <Route path='*' element={<div className="error-section" style={{ margin: '7% 0' }}>
          <div className="container-fluid faq-container">
            <div className="error-content text-center">
              <img className="error-content__icon" src="customer/images/404.svg" alt="404" width="62"
                height="62" />
              <h2 className="error-content__title">
                404. Page not found.
              </h2>
              <p>
                Sorry, we couldn’t find the page you where looking
                for. We suggest that you return to homepage.
              </p>
              <div className="error-content__btn btn">
                <Link to="/">Back to homepage</Link>
              </div>
            </div>
          </div>
        </div>} />
      </Route>

    </Routes></>
  )
}

export default CustomerRouter