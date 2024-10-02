import React, { useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import BookAppoinment from '../views/Customers/components/BookAppoinment';
import MasterLayout from '../views/Customers/components/masterLayout';
import About from '../views/Customers/pages/about';
import Home from "../views/Customers/pages/home";
import Login from '../views/Customers/pages/Login';
// import '../styleCustomers.css'
import Account from "../views/Customers/pages/account";
import Contact from "../views/Customers/pages/contact";
import DepartmentDetails from "../views/Customers/pages/departmentDetails"
import Register from "../views/Customers/pages/Register";
import Service from '../views/Customers/pages/service';
import Blog from '../views/Customers/pages/blog'
import DoctorDetails from '../views/Customers/pages/DoctorDetails';
import DoctorList from '../views/Customers/pages/DoctorList';
import UpdateAccount from '../views/Customers/components/account/UpdateAccount';
import Profile from '../views/Customers/components/account/Profile';
import BookingList from '../views/Customers/components/account/BookingList';
import BookingSuccess from '../views/Customers/components/BookingSuccess';




const CustomerRouter = () => {

  return (
    <>

      <Routes>


        {/* components không có header và footer */}

   



         
      {/* components có chung header và footer */}
      <Route path='/' element={<MasterLayout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route index element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/booking/:idSchedule' element={<BookAppoinment />} />
        <Route path='/booking/result/:idBooking' element={<BookingSuccess />} />
        <Route path='/booking/success' element={<BookingSuccess />} />
        <Route path='/doctors' element={ <DoctorList/>}/>
        <Route path='/doctors/:idDoctor' element={ <DoctorDetails/>}/>
        <Route path='/contact' element={ <Contact/>}/>
        <Route path='/account' element={ <Account/>}/>
        <Route path='/service' element={ <Service/>}/>
        <Route path='/service/specialty/:idNameSpecialty' element={ <DepartmentDetails/>}/>
        <Route path='/blog' element={ <Blog/>}/>
        <Route path='/profile' element={<Profile />} />
        <Route path='/bookingList' element={<BookingList />} />
        <Route path='/updateUser/' element={< UpdateAccount />} />











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