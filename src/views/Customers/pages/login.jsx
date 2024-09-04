import React, { useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import { ToastError, ToastSuccess } from '../../../notification';

const Login = () => {
    const errorStyle = {
        fontSize: '15px',
        color: 'red',
    };

    const Account = {
        phone: "0833691560",
        password: '123'
    }


    // createForm
    const [createForm, setCreateForm] = useState({
        phone: '',
        password: '',
        role: 1
    });

    const [errForm, setErrForm] = useState({
        phone: '',
        password: ''
    });

    // clearForm
    const clearForm = () => {
        setCreateForm({
            phone: '',
            password: '',

        })
    }
    // ham cap nhat gia tri khi o input thay doi
    const onChangeInput = (e) => {
        setCreateForm({ ...createForm, [e.target.name]: e.target.value })

    }
    // validate
    const validateForm = () => {
        const err = {}
        let valid = true;
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const regexPhome = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/
        // check validate Email
        if (createForm.phone.trim() === '') {
            err.phone = "* Phone is requied *"
            valid = false;
        } else if (!regexPhome.test(createForm.phone)) {
            err.phone = "* Please enter a valid phone *"
            valid = false;
        }

        // check requied password
        if (createForm.password.trim() === '') {
            err.password = "* Password is requied *"
            valid = false;
        }

        setErrForm(err);
        return valid;
    }

    const checkLogin = () => {
        if (createForm.phone !== Account.phone || createForm.password !== Account.password) {
            ToastError('Incorrect phone number or password please try again');

        } else {
            ToastSuccess('okok')
            console.log('payload', createForm);
        }
    }

    const onLogin = (e) => {
        e.preventDefault();
        if (validateForm()) {
            checkLogin()
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
                                <h2 className="mb-2 title-color" style={{ textAlign: 'center' }}>Login </h2>
                                <p className="mb-4">Mollitia dicta commodi est recusandae iste, natus eum asperiores
                                    corrupti qui velit . Iste dolorum atque similique praesentium soluta.</p>
                                <form id="#" className="appoinment-form" method="post" action="#">
                                    <div className="row" style={{ padding: '0px 8%', }}>

                                        <div className="col-lg-12" style={{ margin: '5% 0px' }}>
                                            <div className="form-group">
                                                <input name="phone" type="text" className="form-control"
                                                    placeholder="Number Phone"
                                                    value={createForm.phone}
                                                    onChange={onChangeInput} />
                                            </div>
                                            <span style={errorStyle}>{errForm.phone}</span>

                                        </div>

                                        <div className="col-lg-12" style={{ margin: '0 0 5% 0' }}>
                                            <div className="form-group">
                                                <input name="password" id="password" type="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    value={createForm.password}
                                                    onChange={onChangeInput} />
                                            </div>
                                            <span style={errorStyle}>{errForm.password}</span>

                                        </div>
                                    </div>


                                </form>
                                <div style={{ textAlign: 'center' }} >
                                    <div className="btn-container " style={{ color: 'white' }}>
                                        <a onClick={onLogin}
                                            className="btn btn-main-2 btn-icon btn-round-full">Login
                                            <i className="icofont-simple-right ml-2  "></i>
                                        </a>
                                    </div>
                                    <div >
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