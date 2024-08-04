import React from 'react';
import { Link } from 'react-router-dom';

const Department = () => {
  return (
    <div>
      <section className="page-title bg-1">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block text-center">
                <span className="text-white">All Department</span>
                <h1 className="text-capitalize mb-5 text-lg">Care Department</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section service-2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 text-center">
              <div className="section-title">
                <h2>Award winning patient care</h2>
                <div className="divider mx-auto my-4"></div>
                <p>Lets know moreel necessitatibus dolor asperiores illum possimus sint voluptates incidunt molestias nostrum laudantium. Maiores porro cumque quaerat.</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="department-block mb-5">
                <img src="customer/images/service/service-1.jpg" alt="" className="img-fluid w-100" />
                <div className="content">
                  <h4 className="mt-4 mb-2 title-color">Opthomology</h4>
                  <p className="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
                  <Link to="/departmentDetails" className="read-more">Learn More  <i className="icofont-simple-right ml-2"></i></Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="department-block mb-5">
                <img src="customer/images/service/service-2.jpg" alt="" className="img-fluid w-100" />
                <div className="content">
                  <h4 className="mt-4 mb-2 title-color">Cardiology</h4>
                  <p className="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
                  <Link to="/departmentDetails" className="read-more">Learn More <i className="icofont-simple-right ml-2"></i></Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="department-block mb-5">
                <img src="customer/images/service/service-3.jpg" alt="" className="img-fluid w-100" />
                <div className="content">
                  <h4 className="mt-4 mb-2 title-color">Dental Care</h4>
                  <p className="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
                  <Link to="/departmentDetails" className="read-more">Learn More <i className="icofont-simple-right ml-2"></i></Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="department-block mb-5 mb-lg-0">
                <img src="customer/images/service/service-4.jpg" alt="" className="img-fluid w-100" />
                <div className="content">
                  <h4 className="mt-4 mb-2 title-color">Child Care</h4>
                  <p className="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
                  <Link to="/departmentDetails" className="read-more">Learn More <i className="icofont-simple-right ml-2"></i></Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="department-block mb-5 mb-lg-0">
                <img src="customer/images/service/service-6.jpg" alt="" className="img-fluid w-100" />
                <div className="content">
                  <h4 className="mt-4 mb-2 title-color">Pulmology</h4>
                  <p className="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
                  <Link to="/departmentDetails" className="read-more">Learn More <i className="icofont-simple-right ml-2"></i></Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="department-block mb-5 mb-lg-0">
                <img src="customer/images/service/service-8.jpg" alt="" className="img-fluid w-100" />
                <div className="content">
                  <h4 className="mt-4 mb-2 title-color">Gynecology</h4>
                  <p className="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
                  <Link to="/departmentDetails" className="read-more">Learn More <i className="icofont-simple-right ml-2"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Department;
