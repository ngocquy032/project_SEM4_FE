import React from 'react'

function bookAppoinment() {
  return (
      <div>
          <section className="page-title bg-1">
              <div className="overlay"></div>
              <div className="container">
                  <div className="row">
                      <div className="col-md-12">
                          <div className="block text-center">
                              <span className="text-white">Book your Seat</span>
                              <h1 className="text-capitalize mb-5 text-lg">Appoinment</h1>

                              {/* <ul class="list-inline breadcumb-nav">*/}
                              {/*  <li class="list-inline-item"><a href="index.html" class="text-white">Home</a></li>*/}
                              {/*  <li class="list-inline-item"><span class="text-white">/</span></li>*/}
                              {/*  <li class="list-inline-item"><a href="#" class="text-white-50">Book your Seat</a></li>*/}
                              {/*</ul>*/}
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
                              <img src="customer/images/about/img-3.jpg" alt="" className="img-fluid"/>
                              <div className="emergency">
                                  <h2 className="text-lg"><i className="icofont-phone-circle text-lg"></i>+23 345
                                      67980</h2>
                              </div>
                          </div>
                      </div>
                      <div className="col-lg-6 col-md-10 ">
                          <div className="appoinment-wrap mt-5 mt-lg-0">
                              <h2 className="mb-2 title-color">Book appoinment</h2>
                              <p className="mb-4">Mollitia dicta commodi est recusandae iste, natus eum asperiores
                                  corrupti qui velit . Iste dolorum atque similique praesentium soluta.</p>
                              <form id="#" className="appoinment-form" method="post" action="#">
                                  <div className="row">
                                      <div className="col-lg-6">
                                          <div className="form-group">
                                              <select className="form-control" id="exampleFormControlSelect1">
                                                  <option>Choose Department</option>
                                                  <option>Software Design</option>
                                                  <option>Development cycle</option>
                                                  <option>Software Development</option>
                                                  <option>Maintenance</option>
                                                  <option>Process Query</option>
                                                  <option>Cost and Duration</option>
                                                  <option>Modal Delivery</option>
                                              </select>
                                          </div>
                                      </div>
                                      <div className="col-lg-6">
                                          <div className="form-group">
                                              <select className="form-control" id="exampleFormControlSelect2">
                                                  <option>Select Doctors</option>
                                                  <option>Software Design</option>
                                                  <option>Development cycle</option>
                                                  <option>Software Development</option>
                                                  <option>Maintenance</option>
                                                  <option>Process Query</option>
                                                  <option>Cost and Duration</option>
                                                  <option>Modal Delivery</option>
                                              </select>
                                          </div>
                                      </div>

                                      <div className="col-lg-6">
                                          <div className="form-group">
                                              <input name="date" id="date" type="text" className="form-control"
                                                     placeholder="dd/mm/yyyy"/>
                                          </div>
                                      </div>

                                      <div className="col-lg-6">
                                          <div className="form-group">
                                              <input name="time" id="time" type="text" className="form-control"
                                                     placeholder="Time"/>
                                          </div>
                                      </div>
                                      <div className="col-lg-6">
                                          <div className="form-group">
                                              <input name="name" id="name" type="text" className="form-control"
                                                     placeholder="Full Name"/>
                                          </div>
                                      </div>

                                      <div className="col-lg-6">
                                          <div className="form-group">
                                              <input name="phone" id="phone" type="Number" className="form-control"
                                                     placeholder="Phone Number"/>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="form-group-2 mb-4">
                                        <textarea name="message" id="message" className="form-control" rows="6"
                                                  placeholder="Your Message"></textarea>
                                  </div>

                                  <a className="btn btn-main btn-round-full">Make Appoinment <i
                                      className="icofont-simple-right ml-2  "></i></a>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </div>
  )
}

export default bookAppoinment