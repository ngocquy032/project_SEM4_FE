import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useLocation } from "react-router-dom";


function Header(props) {
    const location = useLocation();
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
    return (
        <div style={headerStyle} >
            <header>
                <div className="header-top-bar">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <ul className="top-bar-info list-inline-item pl-0 mb-0">
                                    <li className="list-inline-item"><a style={{ color: '#fff', fontFamily: 'Roboto', fontSize: 14}}  href="mailto:support@gmail.com"><i
                                        className="icofont-support-faq mr-2"></i>support@novena.com</a></li>
                                    <li className="list-inline-item" style={{ color: '#fff', fontFamily: 'Roboto', fontSize: 14}}><i className="icofont-location-pin mr-2"></i>Address
                                        Ta-134/A, New York, USA
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-6">
                                <div className="text-lg-right top-right-bar mt-2 mt-lg-0">
                                    <a href="tel:+23-345-67890">
                                        <span>Call Now : </span>
                                        <span className="h4" style={{ fontFamily: 'Exo', fontWeight: 700, fontSize: 20.8}} >823-4565-13456</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg navigation" id="navbar">
                    <div className="container">
                        <a className="navbar-brand" href="">
                            <img src="customer/images/logo.png" alt="" className="img-fluid"/>
                        </a>

                        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse"
                                data-target="#navbarmain" aria-controls="navbarmain" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="icofont-navigation-menu"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarmain">
                            <ul className="navbar-nav ml-auto">

                                <li className="nav-item active">

                                    <Link className="nav-link" to="/"  style={getLinkStyle("/")}>Home</Link>
                                </li>
                                <li className="nav-item"><Link className="nav-link" to="/about" style={getLinkStyle("/about")}>About</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/service" style={getLinkStyle("/service")}>Services</Link></li>

                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="/department" id="dropdown02"
                                          data-toggle="dropdown" aria-haspopup="true"
                                          aria-expanded="false" style={getLinkStyle("/department")}>Department </Link>
                                    {/*<ul className="dropdown-menu" aria-labelledby="dropdown02">*/}
                                    {/*    <li><a className="dropdown-item" href="department.html">Departments</a></li>*/}
                                    {/*    <li><a className="dropdown-item" href="department-single.html">Department*/}
                                    {/*        Single</a></li>*/}
                                    {/*</ul>*/}
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
                    <div style={{ fontSize: '30px'}}>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"><Link className="nav-link" to="/account" style={getLinkStyle("/account")}> <FontAwesomeIcon
                                icon={faCircleUser}/></Link></li>
                        </ul>


                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Header;