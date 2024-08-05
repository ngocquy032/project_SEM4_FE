import React, {useState} from 'react';
import {Link} from "react-router-dom";

function Register(props) {
    // create form
    const [createFrom, setCreateForm ] = useState({
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        repassword: ''
    });
    // clear Form
    const cleateForm = ()=>{
        setCreateForm({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            repassword: ''
        })
    }

    // change input form
    const inputChange = (e) => {
        setCreateForm({...cleateForm, [e.target.name]: e.target.value})
    }


    const onRegister = (e) =>{
        e.preventDefault();
        console.log('register', createFrom);

    }


      



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
                                <h2 className="mb-2 title-color" style={{textAlign: 'center'}}>Register </h2>
                                <p className="mb-4">Mollitia dicta commodi est recusandae iste, natus eum asperiores
                                    corrupti qui velit . Iste dolorum atque similique praesentium soluta.</p>
                                <form id="#" className="appoinment-form" method="post" action="#">
                                    <div className="row">
                                        <div className="col-lg-6" style={{margin: '0 0 5% 0'}}>
                                            <div className="form-group">
                                                <input name="firstName" required=""  type="text" className="form-control"
                                                       placeholder="First Name" value={createFrom.firstName} onChange={inputChange} />
                                            </div>
                                        </div>

                                        <div className="col-lg-6" >
                                            <div className="form-group">
                                                <input name="lastName"  type="text" className="form-control"
                                                       placeholder="Last Name" value={createFrom.lastName} onChange={inputChange}/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6" style={{margin: '0 0 5% 0'}}>
                                            <div className="form-group">
                                                <input name="email"  type="text" className="form-control"
                                                       placeholder="Email" value={createFrom.email} onChange={inputChange}/>
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <input name="phone"  type="text" className="form-control"
                                                       placeholder="Phone Number" value={createFrom.phone} onChange={inputChange}/>
                                            </div>
                                        </div>
                                        <div className="col-lg-12" style={{margin: '0 0 5% 0'}}>
                                            <div className="form-group" >
                                                <input name="password" type="text" className="form-control"
                                                       placeholder="Password" value={createFrom.password} onChange={inputChange} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12" style={{margin: '0 0 5% 0'}}>
                                            <div className="form-group">
                                                <input name="repassword"  type="text" className="form-control"
                                                       placeholder="Repassword"  value={createFrom.repassword} onChange={inputChange}/>
                                            </div>
                                        </div>

                                    </div>

                                </form>
                                <div style={{textAlign: 'center'}}>
                                    <div className="btn-container " style={{color: 'white'}}>
                                        <a onClick={ onRegister }
                                            className="btn btn-main-2 btn-icon btn-round-full">Register
                                            <i className="icofont-simple-right ml-2  "></i>
                                        </a>
                                    </div>
                                    <div>
                                        Have already an account? <Link to= "/login">Login</Link>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
}

export default Register;
