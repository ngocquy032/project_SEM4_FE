import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addUser, GetUser, removeUser } from "../../../state/Auth/authUserSlice";
import All_API from "../../../state/All_API";
import { ToastError, ToastSuccess } from "../../../notification";


function Header(props) {
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);
    const getLinkStyle = (path) => {
        return location.pathname === path ? { color: 'red' } : {};
    };
    const headerStyle = {
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    };
    // Handlers to show/hide dropdown on hover
    const handleMouseEnter = () => {
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };

    const dropdownStyle = {
        position: 'absolute',
        top: '40px', // adjust based on icon size
        right: '0',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 1000
    };

    const dropdownListStyle = {
        listStyle: 'none',
        padding: '0',
        margin: '0'
    };

    const jwt = localStorage.getItem("jwt");
    const user = useSelector(GetUser)
    const dispatch = useDispatch();
    const [userLoaded, setUserLoaded] = useState(false); 
    const navigate = useNavigate()

    const { idSchedule } = useParams();


    async function getUser(token) {
        try{
          const data = await All_API.getUserAPI(token)
          dispatch(addUser(data.data.data))
          if(data.data?.data.role.id === 1) {
            setUserLoaded(false)
          }else {
            setUserLoaded(true)
          }
        }catch {
          setUserLoaded(true)
          localStorage.removeItem('jwt')
        } 
      }

      useEffect(()=> {
        if(jwt) {
          getUser(jwt)
        }
      },[jwt, userLoaded])
    
    
      useEffect(()=>{
        
        if(location.pathname==="/login" || location.pathname==="/register") {
          if(user !== null) {
            navigate('/')
          }
        }
     

      },[user]) 

      const handleLogout= ()=> {
        localStorage.removeItem("jwt")
        dispatch(removeUser())
        ToastSuccess("Logout in successfully.")
    
      }

    return (
        <div style={headerStyle} >
            <header>
                <div className="header-top-bar">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <ul className="top-bar-info list-inline-item pl-0 mb-0">
                                    <li className="list-inline-item"><a style={{ color: '#fff', fontFamily: 'Roboto', fontSize: 14 }} href="mailto:support@gmail.com"><i
                                        className="icofont-support-faq mr-2"></i>support@novena.com</a></li>
                                    <li className="list-inline-item" style={{ color: '#fff', fontFamily: 'Roboto', fontSize: 14 }}><i className="icofont-location-pin mr-2"></i>Address
                                        Ta-134/A, New York, USA
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-6">
                                <div className="text-lg-right top-right-bar mt-2 mt-lg-0">
                                    <a href="tel:+23-345-67890">
                                        <span>Call Now : </span>
                                        <span className="h4" style={{ fontFamily: 'Exo', fontWeight: 700, fontSize: 20.8 }} >823-4565-13456</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg navigation" id="navbar">
                    <div className="container">
                        <a className="navbar-brand" href="">
                            <img src="customer/images/logo.png" alt="" className="img-fluid" />
                        </a>

                        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse"
                            data-target="#navbarmain" aria-controls="navbarmain" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="icofont-navigation-menu"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarmain">
                            <ul className="navbar-nav ml-auto">

                                <li className="nav-item active">

                                    <Link className="nav-link" to="/" style={getLinkStyle("/")}>Home</Link>
                                </li>
                                <li className="nav-item"><Link className="nav-link" to="/about" style={getLinkStyle("/about")}>About</Link></li>
                                <li className="nav-item dropdown ">
                                    <Link className="nav-link dropdown-toggle" to="/service" style={getLinkStyle("/service")}>Medical Services</Link>

                                </li>




                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="/doctors" id="dropdown03"
                                        data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false" style={getLinkStyle("/doctors")}>Doctors </Link>

                                </li>

                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="/blog" id="dropdown05"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={getLinkStyle("/blog")}>Blog </Link>
                                </li>
                                <li className="nav-item"><Link className="nav-link" to="/contact" style={getLinkStyle("/contact")}>Contact</Link></li>
                            </ul>


                        </div>

                    </div>
                    <div style={{ fontSize: '30px', }}>
                        <ul className="navbar-nav ml-auto">
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/account" style={getLinkStyle("/account")}>
                                    <FontAwesomeIcon icon={faCircleUser} />

                                </Link>
                            </li> */}
                            <li className="nav-item dropdown ">
                                <Link className="nav-link" to="/account" style={getLinkStyle("/account")}>
                                    <FontAwesomeIcon icon={faCircleUser} />

                                </Link>
                                {/* <ul className="dropdown-menu" aria-labelledby="dropdown02">
                                    <li>
                                        <Link to="/bookingAmbulance" style={getLinkStyle("/bookingAmbulance")}><a className="dropdown-item" >Ambulance Booking </a></Link>
                                    </li>
                                    <li><a className="dropdown-item" href="department-single.html">Department Single</a></li>
                                </ul> */}
                            </li>

                        </ul>


                    </div>

                    {/* <div style={{ fontSize: '30px', position: 'relative' }}>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                // style={{ cursor: 'pointer' }}?
                                style={getLinkStyle("/account")}>

                                <FontAwesomeIcon icon={faCircleUser} />

                                {showDropdown && (
                                    <div style={dropdownStyle}>
                                        <ul style={dropdownListStyle}>
                                            <li><Link to="/profile">Profile</Link></li>
                                            <li><Link to="/settings">Settings</Link></li>
                                            <li><Link to="/logout">Logout</Link></li>
                                        </ul>
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div> */}
                </nav>
            </header>
        </div>
    );
}

export default Header;