import React from 'react'
import {Link, NavLink} from "react-router-dom";

const Login = () => {
  return (
      <div>
          <section className="page-title bg-1">
              <div className="overlay"></div>
              <div className="container">
                  <div className="row">
                      <div className="col-md-12">
                          <div className="block text-center">
                              <span className="text-white">Account</span>
                              <h1 className="text-capitalize mb-5 text-lg">Login & Register</h1>

                          </div>
                      </div>
                  </div>
              </div>
          </section>


          <section className="section appoinment">
              <div className="container">
                  <div className="row align-items-center">
                      <div className="col-lg-6 ">
                          <div className="appoinment-content">
                              <img src="customer/images/login.jpg" alt="" className="img-fluid"/>
                              {/*<div className="emergency">*/}
                              {/*    <h2 className="text-lg"><i className="icofont-phone-circle text-lg"></i>+23 345*/}
                              {/*        67980</h2>*/}
                              {/*</div>*/}
                          </div>
                      </div>
                      <div className="col-lg-6 col-md-10 ">
                          <div className="appoinment-wrap mt-5 mt-lg-0">
                              <h2 className="mb-2 title-color" style={{textAlign: 'center'}}>Login </h2>
                              <p className="mb-4">Mollitia dicta commodi est recusandae iste, natus eum asperiores
                                  corrupti qui velit . Iste dolorum atque similique praesentium soluta.</p>
                              <form id="#" className="appoinment-form" method="post" action="#">
                                  <div className="row" style={{padding:'0px 8%', }}>

                                      <div className="col-lg-12" style={{ margin: '5% 0px'}}>
                                          <div className="form-group">
                                              <input name="email" id="email" type="text" className="form-control"
                                                     placeholder="Email"/>
                                          </div>
                                      </div>

                                      <div className="col-lg-12" style={{ margin: '0 0 5% 0'}}>
                                          <div className="form-group">
                                              <input name="password" id="password" type="password"
                                                     className="form-control"
                                                     placeholder="Password"/>
                                          </div>
                                      </div>
                                  </div>


                              </form>
                              <div style={{textAlign: 'center'}} >
                                  <div className="btn-container " style={{ color: 'white'}}>
                                      <a
                                          className="btn btn-main-2 btn-icon btn-round-full">Login
                                          <i className="icofont-simple-right ml-2  "></i>
                                      </a>
                                  </div>
                                  <div>
                                      Don't have an account? <Link to="/register">Register</Link>
                                  </div>

                              </div>

                          </div>
                      </div>
                  </div>
              </div>
          </section>


      </div>
  )
}

export default Login