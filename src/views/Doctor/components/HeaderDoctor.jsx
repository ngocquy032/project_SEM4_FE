import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from "react-router-dom";
import { GetUserAdmin, removeUserAdmin } from '../../../state/Auth/authAdminSlice';
import { removeUserDoctor } from '../../../state/Auth/authDoctorSlice';

function HeaderDoctor(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogout= () => {
    localStorage.removeItem("jwtDoctor")
    dispatch(removeUserDoctor(null))
    navigate('/doctor/login')
    }

    return (
        <header className="main-header">
        <div className="d-flex align-items-center logo-box justify-content-start">	
            {/* <!-- Logo --> */}
            <a href="/doctor" className="logo">
              {/* <!-- logo--> */}
             
              <div className="logo-lg">
                  <span className="light-logo"><img src="/customer/images/logo.png" alt="logo"/></span>
                  <span className="dark-logo"><img src="/customer/images/logo.png" alt="logo"/></span>
              </div>
            </a>	
        </div>  
        {/* <!-- Header Navbar --> */}
        <nav className="navbar navbar-static-top">
          {/* <!-- Sidebar toggle button--> */}
          <div className="app-menu">
            <ul className="header-megamenu nav">
                
            </ul> 
          </div>
            
          <div className="navbar-custom-menu r-side">
            <ul className="nav navbar-nav">			
                {/* <!-- User Account--> */}
                <li className="dropdown user user-menu">
                    <a href="#" className="waves-effect waves-light dropdown-toggle w-auto l-h-12 bg-transparent p-0 no-shadow" data-bs-toggle="dropdown" title="User">
                        <div className="d-flex pt-1">
                            <div className="text-end me-10">
                                <p className="pt-5 fs-14 mb-0 fw-700 text-primary">Johen Doe</p>
                                <small className="fs-10 mb-0 text-uppercase text-mute">Admin</small>
                            </div>
                            <img src="https://png.pngtree.com/png-vector/20190629/ourmid/pngtree-office-work-user-icon-avatar-png-image_1527655.jpg" className="avatar rounded-10 bg-primary-light h-40 w-40" alt="" />
                        </div>
                    </a>
                    <ul className="dropdown-menu animated flipInX">
                      <li className="user-body">
                         <a className="dropdown-item" href='#'><i className="ti-user text-muted me-2"></i> Profile</a>
                         <a className="dropdown-item" href="#" onClick={handleLogout}><i className="ti-lock text-muted me-2"></i> Logout</a>
                      </li>
                    </ul>
                </li>	
                <li className="btn-group nav-item d-lg-inline-flex d-none">
                    <a href="#" data-provide="fullscreen" className="waves-effect waves-light nav-link full-screen btn-warning-light" title="Full Screen">
                        <img src="/admin/images/icons/expand_4562440.png" alt="" className='mt-icons-admin'/>
                    </a>
                </li>
              {/* <!-- Notifications --> */}
              <li className="dropdown notifications-menu">
                <a href="#" className="waves-effect waves-light dropdown-toggle btn-info-light" data-bs-toggle="dropdown" title="Notifications">
                <img src="/admin/images/icons/notification_11924712.png" alt="" />

                </a>
                <ul className="dropdown-menu animated bounceIn">
                  <li className="header">
                    <div className="p-20">
                        <div className="flexbox">
                            <div>
                                <h4 className="mb-0 mt-0">Notifications</h4>
                            </div>
                            <div>
                                <a href="#" className="text-danger">Clear All</a>
                            </div>
                        </div>
                    </div>
                  </li>
                  <li>
                    {/* <!-- inner menu: contains the actual data --> */}
                    <ul className="menu sm-scrol">
                      <li>
                        <a href="#">
                          <i className="fa fa-users text-info"></i> Curabitur id eros quis nunc suscipit blandit.
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-warning text-warning"></i> Duis malesuada justo eu sapien elementum, in semper diam posuere.
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-users text-danger"></i> Donec at nisi sit amet tortor commodo porttitor pretium a erat.
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-shopping-cart text-success"></i> In gravida mauris et nisi
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-user text-danger"></i> Praesent eu lacus in libero dictum fermentum.
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-user text-primary"></i> Nunc fringilla lorem 
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-user text-success"></i> Nullam euismod dolor ut quam interdum, at scelerisque ipsum imperdiet.
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="footer">
                      <a href="#">View all</a>
                  </li>
                </ul>
              </li>			  
            
                
            </ul>
          </div>
        </nav>
      </header>
    );
}

export default HeaderDoctor;