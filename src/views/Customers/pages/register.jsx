import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { ToastError, ToastSuccess } from '../../../notification';
import All_API from '../../../state/All_API';

function Register() {
    const errorStyle = {
        fontSize: '15px',
        color: 'red',
    };
    // create form
    const [createForm, setCreateForm] = useState({
        fullname: '',
        email: '',
        phone_number: '',
        password: '',
        retype_password: ''
    });
    // clear Form
    const cleateForm = () => {
        setCreateForm({
            fullname: '',
            email: '',
            phone_number: '',
            password: '',
            retype_password: ''
        })
    }

    const [errForm, setErrForm] = useState({
        fullname: '',
        email: '',
        phone_number: '',
        password: '',
        retype_password: ''
    })

    // change input form
    const inputChange = (e) => {
        setCreateForm({ ...createForm, [e.target.name]: e.target.value })
    }
    const validateForm = () => {
        const err = {};
        let valid = true;
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const regexPhome = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/
        if (createForm.fullname.trim() === '') {
            err.fullname = "* First Name is requied *"
            valid = false;
        }
        // mail
        if (createForm.email.trim() === '') {
            err.email = "* Email is requied *"
            valid = false;
        } else if (!regexEmail.test(createForm.email)) {
            err.email = "* Please enter a valid emaid adders *"
            valid = false;
        }
    
        // phone_number
        if (createForm.phone_number.trim() === '') {
            err.phone_number = "* phone_number is requied *"
            valid = false;
        } else if (!regexPhome.test(createForm.phone_number)) {
            err.phone_number = "* Please enter a valid phone_number *"
            valid = false;
        }

        //pass
        if (createForm.password.trim() === '') {
            err.password = "* Password is requied *"
            valid = false;
        }
        if (createForm.retype_password.trim() === '') {
            err.retype_password = "* retype_password is requied *"
            valid = false;
        } else if (createForm.password !== createForm.retype_password) {
            // check pass voi repass
            err.retype_password = "* Password does not match the password just entered, please re-enter *"
            valid = false;
        }

        setErrForm(err);
        return valid;
    }


    const onRegister = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await All_API.registerAPI(createForm);

                if(response.data.status === "success"){
                    cleateForm();
                    ToastSuccess(response.data.message);
                    navigator('/login')
                }else{
                    ToastError('Please try again1')
                }
                
            } catch (error) {
                ToastError(error.response.data.message)
            }
        }
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
                                <img src="customer/images/login.jpg" alt="" className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-10 ">
                            <div className="appoinment-wrap mt-5 mt-lg-0">
                                <h2 className="mb-2 title-color" style={{ textAlign: 'center' }}>Register </h2>
                                <p className="mb-4">Mollitia dicta commodi est recusandae iste, natus eum asperiores
                                    corrupti qui velit . Iste dolorum atque similique praesentium soluta.</p>
                                <form id="" className="appoinment-form" method="" action="">
                                    <div className="row">
                                        <div className="col-lg-6" style={{ margin: '0 0 5% 0' }}>
                                            <div className="form-group">
                                                <input name="fullname" required="" type="text" className="form-control"
                                                    placeholder="Full Name"
                                                    value={createForm.fullname}
                                                    onChange={inputChange} />
                                            </div>
                                            <span style={errorStyle}>{errForm.fullname}</span>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <input name="phone_number" type="text" className="form-control"
                                                    placeholder="Phone Number"
                                                    value={createForm.phone_number}
                                                    onChange={inputChange} />
                                            </div>
                                            <span style={errorStyle}>{errForm.phone_number}</span>

                                        </div>

                                        <div className="col-lg-12" style={{ margin: '0 0 5% 0' }}>
                                            <div className="form-group">
                                                <input name="email" type="text" className="form-control"
                                                    placeholder="Email"
                                                    value={createForm.email}
                                                    onChange={inputChange} />
                                            </div>
                                            <span style={errorStyle}>{errForm.email}</span>

                                        </div>
                                        <div className="col-lg-12" style={{ margin: '0 0 5% 0' }}>
                                            <div className="form-group" >
                                                <input name="password" type="password" className="form-control"
                                                    placeholder="Password"
                                                    value={createForm.password}
                                                    onChange={inputChange} />
                                            </div>
                                            <span style={errorStyle}>{errForm.password}</span>

                                        </div>
                                        <div className="col-lg-12" style={{ margin: '0 0 5% 0' }}>
                                            <div className="form-group">
                                                <input name="retype_password" type="password" className="form-control"
                                                    placeholder="Repassword"
                                                    value={createForm.retype_password}
                                                    onChange={inputChange} />
                                            </div>
                                            <span style={errorStyle}>{errForm.retype_password}</span>

                                        </div>

                                    </div>

                                </form>
                                <div style={{ textAlign: 'center' }}>
                                    <div className="btn-container " style={{ color: 'white' }}>
                                        <a onClick={onRegister}
                                            className="btn btn-main-2 btn-icon btn-round-full">Register
                                            <i className="icofont-simple-right ml-2  "></i>
                                        </a>
                                    </div>
                                    <div>
                                        Have already an account? <Link to="/login">Login</Link>
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

export default Register
