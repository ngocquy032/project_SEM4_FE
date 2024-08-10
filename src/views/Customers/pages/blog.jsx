
import React from 'react';
import { Link } from "react-router-dom";

const blog = () => {
    return (
        <>
            <section className="page-title bg-1">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block text-center">
                                <span className="text-white">Our blog</span>
                                <h1 className="text-capitalize mb-5 text-lg">Blog articles</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section blog-wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 mb-5">
                                    <div className="blog-item">
                                        <div className="blog-thumb">
                                            <img src="customer/images/blog/blog-1.jpg" alt="" className="img-fluid" />
                                        </div>

                                        <div className="blog-item-content">
                                            <div className="blog-item-meta mb-3 mt-4">
                                                <span className="text-muted text-capitalize mr-3"><i className="icofont-comment mr-2"></i>5 Comments</span>
                                                <span className="text-black text-capitalize mr-3"><i className="icofont-calendar mr-1"></i> 28th January</span>
                                            </div>

                                            <h2 className="mt-3 mb-3">
                                                <Link to="/blog-single">Choose quality service over cheap service all type of things</Link>
                                            </h2>

                                            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis aliquid architecto facere commodi cupiditate omnis voluptatibus inventore atque velit cum rem id assumenda quam recusandae ipsam ea porro, dicta ad.</p>

                                            <Link to="/blog-single" className="btn btn-main btn-icon btn-round-full">Read More <i className="icofont-simple-right ml-2"></i></Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-12 mb-5">
                                    <div className="blog-item">
                                        <div className="blog-thumb">
                                        <img src="customer/images/blog/blog-2.jpg" alt="" className="img-fluid" />
                                        </div>

                                        <div className="blog-item-content">
                                            <div className="blog-item-meta mb-3 mt-4">
                                                <span className="text-muted text-capitalize mr-3"><i className="icofont-comment mr-2"></i>5 Comments</span>
                                                <span className="text-black text-capitalize mr-3"><i className="icofont-calendar mr-1"></i> 28th January</span>
                                            </div>

                                            <h2 className="mt-3 mb-3">
                                                <Link to="/blog-single">All test cost 25% in always in our laboratory</Link>
                                            </h2>

                                            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis aliquid architecto facere commodi cupiditate omnis voluptatibus inventore atque velit cum rem id assumenda quam recusandae ipsam ea porro, dicta ad.</p>

                                            <Link to="/blog-single" className="btn btn-main btn-icon btn-round-full">Read More <i className="icofont-simple-right ml-2"></i></Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-12 mb-5">
                                    <div className="blog-item">
                                        <div className="blog-thumb">
                                            <img src="customer/images/blog/blog-4.jpg" alt="" className="img-fluid" />
                                        </div>

                                        <div className="blog-item-content">
                                            <div className="blog-item-meta mb-3 mt-4">
                                                <span className="text-muted text-capitalize mr-3"><i className="icofont-comment mr-2"></i>5 Comments</span>
                                                <span className="text-black text-capitalize mr-3"><i className="icofont-calendar mr-1"></i> 28th January</span>
                                            </div>
                                            <h2 className="mt-3 mb-3">
                                                <Link to="/blog-single">Get Free consultation from our special surgeon and doctors</Link>
                                            </h2>

                                            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis aliquid architecto facere commodi cupiditate omnis voluptatibus inventore atque velit cum rem id assumenda quam recusandae ipsam ea porro, dicta ad.</p>
                                            <Link to="/blog-single" className="btn btn-main btn-icon btn-round-full">Read More <i className="icofont-simple-right ml-2"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="sidebar-wrap pl-lg-4 mt-5 mt-lg-0">
                                <div className="sidebar-widget search mb-3">
                                    <h5>Search Here</h5>
                                    <form action="#" className="search-form">
                                        <input type="text" className="form-control" placeholder="search" />
                                        <i className="ti-search"></i>
                                    </form>
                                </div>

                                <div className="sidebar-widget latest-post mb-3">
                                    <h5>Popular Posts</h5>

                                    <div className="py-2">
                                        <span className="text-sm text-muted">03 Mar 2018</span>
                                        <h6 className="my-2"><Link to="#">Thoughtful living in Los Angeles</Link></h6>
                                    </div>

                                    <div className="py-2">
                                        <span className="text-sm text-muted">03 Mar 2018</span>
                                        <h6 className="my-2"><Link to="#">Vivamus molestie gravida turpis.</Link></h6>
                                    </div>

                                    <div className="py-2">
                                        <span className="text-sm text-muted">03 Mar 2018</span>
                                        <h6 className="my-2"><Link to="#">Fusce lobortis lorem at ipsum semper sagittis</Link></h6>
                                    </div>
                                </div>

                                <div className="sidebar-widget category mb-3">
                                    <h5 className="mb-4">Categories</h5>

                                    <ul className="list-unstyled">
                                        <li className="align-items-center">
                                            <Link to="#">Medicine</Link>
                                            <span>(14)</span>
                                        </li>
                                        <li className="align-items-center">
                                            <Link to="#">Equipments</Link>
                                            <span>(2)</span>
                                        </li>
                                        <li className="align-items-center">
                                            <Link to="#">Heart</Link>
                                            <span>(10)</span>
                                        </li>
                                        <li className="align-items-center">
                                            <Link to="#">Free counselling</Link>
                                            <span>(5)</span>
                                        </li>
                                        <li className="align-items-center">
                                            <Link to="#">Lab test</Link>
                                            <span>(5)</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="sidebar-widget tags mb-3">
                                    <h5 className="mb-4">Tags</h5>

                                    <Link to="#">Doctors</Link>
                                    <Link to="#">agency</Link>
                                    <Link to="#">company</Link>
                                    <Link to="#">medicine</Link>
                                    <Link to="#">surgery</Link>
                                    <Link to="#">Marketing</Link>
                                    <Link to="#">Social Media</Link>
                                    <Link to="#">Branding</Link>
                                    <Link to="#">Laboratory</Link>
                                </div>

                                <div className="sidebar-widget schedule-widget mb-3">
                                    <h5 className="mb-4">Time Schedule</h5>

                                    <ul className="list-unstyled">
                                        <li className="d-flex justify-content-between align-items-center">
                                            <Link to="#">Monday - Friday</Link>
                                            <span>9:00 - 17:00</span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            <Link to="#">Saturday</Link>
                                            <span>9:00 - 16:00</span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            <Link to="#">Sunday</Link>
                                            <span>Closed</span>
                                        </li>
                                    </ul>

                                    <div className="sidebar-contact-info mt-4">
                                        <p className="mb-0">Need Urgent Help?</p>
                                        <h3>+23-4565-65768</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-lg-8">
                            <nav className="pagination py-2 d-inline-block">
                                <div className="nav-links">
                                    <span aria-current="page" className="page-numbers current">1</span>
                                    <Link className="page-numbers" to="#">2</Link>
                                    <Link className="page-numbers" to="#">3</Link>
                                    <Link className="page-numbers" to="#"><i className="icofont-thin-double-right"></i></Link>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default blog;