import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { ToastSuccess } from '../../../notification';

function Register(props) {
    const errorStyle = {
        fontSize: '15px',
        color: 'red',
    };
    // create form
    const [createForm, setCreateForm] = useState({
        role: 1,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        repassword: ''
    });
    // clear Form
    const cleateForm = () => {
        setCreateForm({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            repassword: ''
        })
    }

    const [errForm, setErrForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        repassword: ''
    })

    // change input form
    const inputChange = (e) => {
        setCreateForm({ ...createForm, [e.target.name]: e.target.value })
    }
    const validateForm = () => {
        const existingData = [
            { email: 'dung@gmail.com', phone: '0833691560' },
            { email: 'example@test.com', phone: '0912345678' },

        ];
        const isEmailExist = existingData.some(user => user.email === createForm.email);
        const isPhoneExist = existingData.some(user => user.phone === createForm.phone);
        const err = {};
        let valid = true;
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const regexPhome = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/
        if (createForm.firstName.trim() === '') {
            err.firstName = "* First Name is requied *"
            valid = false;
        }
        if (createForm.lastName.trim() === '') {
            err.lastName = "* Last Name is requied *"
            valid = false;
        }
        // mail
        if (createForm.email.trim() === '') {
            err.email = "* Email is requied *"
            valid = false;
        } else if (!regexEmail.test(createForm.email)) {
            err.email = "* Please enter a valid emaid adders *"
            valid = false;
        } else if (isEmailExist) {
            err.email = "* Email already exists *"
            valid = false;
        }

        // phone
        if (createForm.phone.trim() === '') {
            err.phone = "* Phone is requied *"
            valid = false;
        } else if (!regexPhome.test(createForm.phone)) {
            err.phone = "* Please enter a valid phone *"
            valid = false;
        }else if (isPhoneExist) {
            err.phone = "* Phone already exists *"
            valid = false;
        }

        //pass
        if (createForm.password.trim() === '') {
            err.password = "* Password is requied *"
            valid = false;
        }
        if (createForm.repassword.trim() === '') {
            err.repassword = "* Repassword is requied *"
            valid = false;
        }else if (createForm.password !== createForm.repassword) {
            // check pass voi repass
            err.repassword = "* Password does not match the password just entered, please re-enter *"
            valid = false;
        }

        setErrForm(err);
        return valid;
    }
    const [registeredUsers, setRegisteredUsers] = useState([]);


    const onRegister = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const { repassword, ...formDataWithoutRepassword } = createForm;
            console.log('register', formDataWithoutRepassword);
            // setRegisteredUsers([...registeredUsers, formDataWithoutRepassword]);
            setRegisteredUsers(prevUsers => {
                const updatedUsers = [...prevUsers, formDataWithoutRepassword];
                console.log('Registered Users:', updatedUsers); // Hiển thị toàn bộ danh sách người dùng đã đăng ký
                return updatedUsers;
            });
          

            ToastSuccess('okok')


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
                                {/*<div className="emergency">*/}
                                {/*    <h2 className="text-lg"><i className="icofont-phone-circle text-lg"></i>+23 345*/}
                                {/*        67980</h2>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-10 ">
                            <div className="appoinment-wrap mt-5 mt-lg-0">
                                <h2 className="mb-2 title-color" style={{ textAlign: 'center' }}>Register </h2>
                                <p className="mb-4">Mollitia dicta commodi est recusandae iste, natus eum asperiores
                                    corrupti qui velit . Iste dolorum atque similique praesentium soluta.</p>
                                <form id="#" className="appoinment-form" method="post" action="#">
                                    <div className="row">
                                        <div className="col-lg-6" style={{ margin: '0 0 5% 0' }}>
                                            <div className="form-group">
                                                <input name="firstName" required="" type="text" className="form-control"
                                                    placeholder="First Name"
                                                    value={createForm.firstName}
                                                    onChange={inputChange} />
                                            </div>
                                            <span style={errorStyle}>{errForm.firstName}</span>
                                        </div>

                                        <div className="col-lg-6" >
                                            <div className="form-group">
                                                <input name="lastName" type="text" className="form-control"
                                                    placeholder="Last Name"
                                                    value={createForm.lastName}
                                                    onChange={inputChange} />
                                            </div>
                                            <span style={errorStyle}>{errForm.lastName}</span>

                                        </div>
                                        <div className="col-lg-6" style={{ margin: '0 0 5% 0' }}>
                                            <div className="form-group">
                                                <input name="email" type="text" className="form-control"
                                                    placeholder="Email"
                                                    value={createForm.email}
                                                    onChange={inputChange} />
                                            </div>
                                            <span style={errorStyle}>{errForm.email}</span>

                                        </div>

                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <input name="phone" type="text" className="form-control"
                                                    placeholder="Phone Number"
                                                    value={createForm.phone}
                                                    onChange={inputChange} />
                                            </div>
                                            <span style={errorStyle}>{errForm.phone}</span>

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
                                                <input name="repassword" type="password" className="form-control"
                                                    placeholder="Repassword"
                                                    value={createForm.repassword}
                                                    onChange={inputChange} />
                                            </div>
                                            <span style={errorStyle}>{errForm.repassword}</span>

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

export default Register;
