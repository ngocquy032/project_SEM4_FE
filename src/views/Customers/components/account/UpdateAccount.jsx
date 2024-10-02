import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import All_API from '../../../../state/All_API';
import { convertDate } from '../../../Admin/componets/ConvertData';
import { ToastError, ToastSuccess } from '../../../../notification';
import Profile from './Profile';
import { faCircleUser, faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const UpdateAccount = ({ onSuccess }) => {
    const token = localStorage.getItem('jwt');
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const [birthday, setBirthday] = useState()
    const [active, setActive] = useState(null);
    const [createForm, setCreateForm] = useState({
        fullname: '',
        address: '',
        email: '',
        phone_number: '',
        gender: '',
        password: '',
        is_active: '',
        retype_password: '',
    });
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await All_API.getUserAPI(token);
                if (response.data) {
                    setCreateForm(response.data.data);
                    setUserId(response.data.data.id);
                    setBirthday(convertDate(response?.data?.data.birthday))
                }
                console.log('response', response)
                console.log("setCreateForm", setCreateForm)

            } catch (error) {
                console.error('Failed to fetch user details:', error);
            }

        }
        fetchUser();
    }, [token]);

    const inputChange = (e) => {
        const { name, value } = e.target;
        setCreateForm((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const updateUser = async (e) => {
        e.preventDefault();
        const userData = {
            fullname: createForm.fullname,
            address: createForm.address,
            email: createForm.email,
            phone_number: createForm.phone_number,
            birthday: birthday,
            gender: createForm.gender,
            active: active === "true",
            password: createForm.password ? createForm.password : ""
        };

        try {
            const response = await All_API.updateUserByUser(userId, userData);
            if (response.status === 200) {
                ToastSuccess('Update user successfully.');
                onSuccess();
            } else {
                ToastError(response.data.message)
            }
        } catch (error) {
            ToastError(error.response.data.message)
        }

    }
    const cancle = () => {
        onSuccess();
    }

    return (
        <div class="content-wrapper" style={{ margin: '5% 15% 0 15%'}}>
            <div class="container-full">
                <div class="content-header">
                    <div class="d-flex align-items-center">
                        <div class="me-auto">
                            <h2 class="page-title">Users</h2>
                            <div class="d-inline-block align-items-center">
                                <nav>
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a><FontAwesomeIcon icon={faCircleUser} /></a>
                                        </li>
                                        <li class="breadcrumb-item active" aria-current="page">UpdateUser</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="tab-pane " >
                    <div class="p-15">
                        <section class="content">
                            <div class="row">
                                <div class=" col-12">
                                    <div class="box">

                                        {/* <!-- /.box-header --> */}
                                        <form class="form">
                                            <div class="box-body">
                                                <h4 class="box-title text-info mb-0"><i class="ti-user me-15"></i> User Info
                                                </h4>
                                                <div class="my-15">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="form-label">Full Name</label>
                                                                <input type="text" class="form-control"
                                                                    placeholder="Full Name"
                                                                    value={createForm?.fullname || ''}
                                                                    onChange={inputChange}
                                                                    name='fullname'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="form-label">Address</label>
                                                                <input type="text" class="form-control"
                                                                    placeholder="Address"
                                                                    value={createForm?.address || ''}
                                                                    onChange={inputChange}
                                                                    name='address' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="form-label">E-mail</label>
                                                                <input type="text" class="form-control"
                                                                    placeholder="E-mail"
                                                                    value={createForm?.email || ''}
                                                                    onChange={inputChange}
                                                                    name='email' />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="form-label">Contact Number</label>
                                                                <input type="text" class="form-control"
                                                                    placeholder="Phone"
                                                                    value={createForm?.phone_number || ''}
                                                                    onChange={inputChange}
                                                                    name='phone_number' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="form-label">BirthDay</label>
                                                                <input type="date" class="form-control"
                                                                    value={birthday || ''}
                                                                    onChange={(e) => setBirthday(e.target.value)}

                                                                    name='birthday' />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="form-label">Gender</label> <br />
                                                                <select class="form-control"
                                                                    style={{ fontSize: 'unset' }}
                                                                    value={createForm?.gender}
                                                                    onChange={inputChange}
                                                                    name='gender'>
                                                                    <option ></option>
                                                                    <option value="Male">Male</option>
                                                                    <option value="Female">Female</option>
                                                                </select>
                                                            </div>
                                                        </div>


                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="form-label">Passwod</label>
                                                                <input type="text" class="form-control"
                                                                    // value={createForm?.password}
                                                                    onChange={inputChange}
                                                                    name='password' />
                                                            </div>
                                                        </div>

                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="form-label">Active</label> <br />
                                                                <select class="form-control"
                                                                    style={{ fontSize: 'unset' }}
                                                                    value={active}
                                                                    onChange={(e) => setActive(e.target.value)}
                                                                    name='is_active'>
                                                                    <option value="true">Active</option>
                                                                    <option value="false">Block</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div class="my-15">
                                                    <div class="box-footer">
                                                        <button type="button" class="btn btn-warning m-10"
                                                            onClick={cancle}
                                                        >
                                                            <i class="ti-trash"></i> Cancel
                                                        </button>
                                                        <button type="submit" class="btn btn-primary"
                                                            onClick={updateUser}
                                                        >
                                                            <i class="ti-save-alt"></i> Update
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form >
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default UpdateAccount