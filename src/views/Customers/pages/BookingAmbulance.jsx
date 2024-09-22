import React from 'react'

const BookingAmbulance = () => {
    return (
        <div>
            <section className="page-title bg-1">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block text-center">
                                <span className="text-white">Book your Seat</span>
                                <h1 className="text-capitalize mb-5 text-lg">Ambulance</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section about">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4 col-sm-6">
                            <div className="about-img">
                                <img src="https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/service-v1-3.jpg" alt="" className="img-fluid" />
                                <img src="https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/service-v1-1.jpg" alt="" className="img-fluid mt-4" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="about-img mt-4 mt-lg-0">
                                <img src="https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/about-style1__image-1.jpg" alt="" className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="about-content pl-4 mt-4 mt-lg-0">
                                <h2 className="title-color">Personal care <br />& healthy living</h2>
                                <p className="mt-4 mb-5">We provide best leading medicle service Nulla perferendis
                                    veniam deleniti ipsum officia dolores repellat laudantium obcaecati neque.</p>

                                <a href="service.html" className="btn btn-main-2 btn-round-full btn-icon">Services<i
                                    className="icofont-simple-right ml-3"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default BookingAmbulance