import React, { Fragment } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Home from "../views/Customers/pages/home";
import Login from '../views/Customers/pages/login';
import MasterLayout from '../views/Customers/components/masterLayout';
import About from '../views/Customers/pages/about';
import BookAppoinment from '../views/Customers/components/bookAppoinment';
import Department from "../views/Customers/pages/department";
import ScrollTop from '../scrollTop';
import Doctors from '../views/Customers/pages/doctors';
import Contact from "../views/Customers/pages/contact";
import Account from "../views/Customers/pages/account";
import Register from "../views/Customers/pages/register";
import DoctorDetails from "../views/Customers/pages/doctorDetails";
import Blog from '../views/Customers/pages/blog';
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
            <Route path='/bookAppointment' element={<BookAppoinment />} />
            <Route path='/doctors' element={<Doctors />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/department' element={<Department />} />
            <Route path='/account' element={<Account />} />
            <Route path='/doctorDetails' element={<DoctorDetails />} />
            <Route path='/blog' element={<Blog />} />

            <Route path='*' element={
              <div className="error-section" style={{ margin: '7% 0' }}>
                <div className="container-fluid faq-container">
                  <div className="error-content text-center">
                    <img className="error-content__icon" src="customer/images/404.svg" alt="404" width="62" height="62" />
                    <h2 className="error-content__title">
                      404. Page not found.
                    </h2>
                    <p>
                      Sorry, we couldn’t find the page you were looking for. We suggest that you return to the homepage.
                    </p>
                    <div className="error-content__btn btn">
                      <Link to="/">Back to homepage</Link>
                    </div>
                  </div>
                </div>
              </div>
            } />
          </Route>
        </Routes>
      </>
  );
};

export default CustomerRouter;
