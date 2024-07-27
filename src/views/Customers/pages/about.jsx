import React from 'react'

const About = () => {
  return (
    <div>
      <section className="fetaure-page ">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="about-block-item mb-5 mb-lg-0">
              <img src="customer/images/about/about-1.jpg" alt="" className="img-fluid w-100"/>
                <h4 className="mt-3">Healthcare for Kids</h4>
                <p>Voluptate aperiam esse possimus maxime repellendus, nihil quod accusantium .</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="about-block-item mb-5 mb-lg-0">
              <img src="customer/images/about/about-2.jpg" alt="" className="img-fluid w-100"/>
                <h4 className="mt-3">Medical Counseling</h4>
                <p>Voluptate aperiam esse possimus maxime repellendus, nihil quod accusantium .</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="about-block-item mb-5 mb-lg-0">
              <img src="customer/images/about/about-3.jpg" alt="" className="img-fluid w-100"/>
                <h4 className="mt-3">Modern Equipments</h4>
                <p>Voluptate aperiam esse possimus maxime repellendus, nihil quod accusantium .</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="about-block-item">
              <img src="customer/images/about/about-4.jpg" alt="" className="img-fluid w-100"/>
                <h4 class="mt-3">Qualified Doctors</h4>
                <p>Voluptate aperiam esse possimus maxime repellendus, nihil quod accusantium .</p>
            </div>
          </div>
        </div>
      </div>
    </section>


      <section class="section awards">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-4">
            <h2 class="title-color">Our Doctors achievements </h2>
            <div class="divider mt-4 mb-5 mb-lg-0"></div>
          </div>
          <div class="col-lg-8">
            <div class="row">
              <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="award-img">
                  <img src="customer/images/about/3.png" alt="" class="img-fluid"/>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="award-img">
                  <img src="customer/images/about/4.png" alt="" class="img-fluid"/>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="award-img">
                  <img src="customer/images/about/1.png" alt="" class="img-fluid"/>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="award-img">
                  <img src="customer/images/about/2.png" alt="" class="img-fluid"/>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="award-img">
                  <img src="customer/images/about/5.png" alt="" class="img-fluid"/>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="award-img">
                  <img src="customer/images/about/6.png" alt="" class="img-fluid"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      <section class="section team">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="section-title text-center">
              <h2 class="mb-4">Meet Our Specialist</h2>
              <div class="divider mx-auto my-4"></div>
              <p>Today’s users expect effortless experiences. Don’t let essential people and processes stay stuck in the past. Speed it up, skip the hassles</p>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="team-block mb-5 mb-lg-0">
              <img src="customer/images/team/1.jpg" alt="" class="img-fluid w-100"/>

                <div class="content">
                  <h4 class="mt-4 mb-0"><a href="doctor-single.html">John Marshal</a></h4>
                  <p>Internist, Emergency Physician</p>
                </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="team-block mb-5 mb-lg-0">
              <img src="customer/images/team/2.jpg" alt="" class="img-fluid w-100"/>

                <div class="content">
                  <h4 class="mt-4 mb-0"><a href="doctor-single.html">Marshal Root</a></h4>
                  <p>Surgeon, Сardiologist</p>
                </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="team-block mb-5 mb-lg-0">
              <img src="customer/images/team/3.jpg" alt="" class="img-fluid w-100"/>

                <div class="content">
                  <h4 class="mt-4 mb-0"><a href="doctor-single.html">Siamon john</a></h4>
                  <p>Internist, General Practitioner</p>
                </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="team-block">
              <img src="customer/images/team/4.jpg" alt="" class="img-fluid w-100"/>

                <div class="content">
                  <h4 class="mt-4 mb-0"><a href="doctor-single.html">Rishat Ahmed</a></h4>
                  <p>Orthopedic Surgeon</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  )
}

export default About