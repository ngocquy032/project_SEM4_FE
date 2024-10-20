import React, { useEffect, useState } from 'react'
import { faCircleUser, faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import All_API from '../../../state/All_API';
import { ToastError, ToastSuccess } from '../../../notification';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GetUserAdmin } from '../../../state/Auth/authAdminSlice';

const LoginAdmin = () => {
    const navigate = useNavigate();
    const userAdmin = useSelector(GetUserAdmin)


    const [createForm, setCreateForm] = useState({
        phone_number: '',
        password: '',
        role_id: 2

    });
    const inputChange = (e) => {
        const { name, value } = e.target;
        setCreateForm((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const clearInput = () =>{
        setCreateForm({
            phone_number: '',
            password: ''
        })
    }



    const onClickLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await All_API.loginAPI(createForm);
            if (response.data.status === "success") {
                localStorage.setItem("jwtAdmin", response.data.token);
                ToastSuccess(response.data.message)
                navigate('/admin')
            } else {
                ToastError(response.data.message)
            }
        } catch (error) {
            ToastError(error.response.data.message)
        }


    }

    useEffect(() => {
        if (userAdmin?.role.id === 2) {
            navigate("/admin") 
        }
    }, [userAdmin, navigate]);
    return (
        <body class="hold-transition theme-primary bg-img" style={{ backgroundImage: `url("/admin/images/bg-1.jpg")` }}>


            <div >
                <div class="container h-p100"  >
                    <div class="row align-items-center justify-content-md-center h-p100">

                        <div class="col-12">
                            <div class="row justify-content-center g-0">
                                <div class="col-lg-5 col-md-5 col-12" style={{ marginTop: '10.5%' }}>
                                    <div class="bg-white rounded10 shadow-lg">
                                        <div class="content-top-agile p-20 pb-0">
                                            <h2 class="text-primary">Let's Get Started</h2>
                                            <p class="mb-0">Sign in to continue to Doclinic.</p>
                                        </div>
                                        <div class="p-40">
                                            <form action="" method="">
                                                <div className="row" style={{ padding: '0px 8%', }}>

                                                    <div className="col-lg-12" style={{ margin: '5% 0px' }}>
                                                        <div className="form-group">
                                                            <input name="phone_number" type="text" className="form-control"
                                                                placeholder="Phone Number"
                                                                value={createForm.phone_number}
                                                                onChange={inputChange}
                                                            />
                                                        </div>


                                                    </div>

                                                    <div className="col-lg-12" style={{ margin: '0 0 5% 0' }}>
                                                        <div className="form-group">
                                                            <input name="password" type="password"
                                                                className="form-control"
                                                                placeholder="Password"
                                                                value={createForm.password}
                                                                onChange={inputChange}
                                                            />
                                                        </div>
                                                        {/* <span style={errorStyle}>{errForm.password}</span> */}

                                                    </div>
                                                </div>
                                                <div class="row">

                                                    <div class="col-12 text-center">
                                                        <button type="submit" onClick={onClickLogin} class="btn btn-danger mt-10">SIGN IN</button>
                                                    </div>

                                                </div>
                                            </form>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer section">
                <div className="container">
                    <div className="footer-btm py-4 mt-4">
                        <div className="copyright" style={{ textAlign: 'center', color: 'antiquewhite' }}>
                            &copy; Copyright Reserved to Novena by Team2
                        </div>
                    </div>
                </div>
            </footer>

        </body>

    )
}

export default LoginAdmin