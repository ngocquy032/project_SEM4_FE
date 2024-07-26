import React, { Fragment } from 'react'
import {Link, Route, Routes} from 'react-router-dom'
import Home from "../views/Customers/pages/home";
import Login from '../views/Customers/pages/login';
import MasterLayout from '../views/Customers/components/masterLayout';
import About from '../views/Customers/pages/about';
import BookAppoinment from '../views/Customers/components/bookAppoinment';
// import '../styleCustomers.css'
import ScrollTop from '../scrollTop';
import Doctors from '../views/Customers/pages/doctors';
import Contact from "../views/Customers/pages/contact";




const CustomerRouter = () => {
  return (
    <>
    <ScrollTop />
    <Routes>


      {/* components không có header và footer */}
      <Route path='/login' element={<Login />} />

      {/* components có chung header và footer */}
      <Route path='/' element={<MasterLayout />}>
        <Route index element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/bookAppoinment' element={<BookAppoinment />} />
        <Route path='/doctors' element={ <Doctors/>}/>
        <Route path='/contact' element={ <Contact/>}/>





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