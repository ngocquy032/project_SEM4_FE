import React, { useEffect, useState } from 'react'
import { faCircleUser, faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import All_API from '../../../../state/All_API';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastError, ToastSuccess } from '../../../../notification';

const UserUpdate = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [createForm, setCreateForm] = useState({
        fullname: '',
        address: '',
        email: '',
        phone_number: '',
        birthday: '',
        gender: '',
        password: '',
        role_id: '',
        active: ''
    });

    // call api
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await All_API.getUserById(userId);
                if (response.data && response.data.data) {
                    setCreateForm(response.data.data);
                }
                console.log('respone', response.data.data);

            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu người dùng:', error);
            }
        }
        fetchUserData();
    }, [userId]);
    const inputChange = (e) => {
        const { name, value } = e.target;
        setCreateForm((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const updateUser = async(e) => {
        e.preventDefault();
        const userData = {
            fullname: createForm.fullname,
            address: createForm.address,
            email: createForm.email,
            phone_number: createForm.phone_number,
            birthday: createForm.birthday,
            gender: createForm.gender,
            role_id: createForm.role_id,
            active: createForm.active === "true",
            password: createForm.password !== "" ? createForm.password : ""
        };

        try {
            const response = await All_API.updateUserByAdmin(userId, userData);
            if(response.status === 200){
                ToastSuccess(response.data.message)
            }else{
                ToastError(response.data.message)
            }
            
        } catch (error) {
                      ToastError(error.response.data.message)

        }
        console.log('dataSetCreate', createForm );

    }
    const cancle = () => {
        navigate('/admin/userList')
    }

    return (
        <div class="content-wrapper">
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
                                        <li class="breadcrumb-item active" aria-current="page">UserAdd</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <section class="content">
                    <div class="row">
                        <div class=" col-12">
                            <div class="box">
                                <div class="box-header with-border">
                                    <h4 class="box-title"> Create User</h4>
                                </div>
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
                                                            value={createForm?.fullname || 'N/A'}
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
                                                            value={createForm?.address || 'N/A'}
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
                                                            value={createForm?.email || 'N/A'}
                                                            onChange={inputChange}
                                                            name='email' />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Contact Number</label>
                                                        <input type="text" class="form-control"
                                                            placeholder="Phone"
                                                            value={createForm?.phone_number || 'N/A'}
                                                            onChange={inputChange}
                                                            name='phone_number' />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">BirthDay</label>
                                                        <input type="text" class="form-control"
                                                            value={createForm.birthday}
                                                            onChange={inputChange}
                                                            name='birthday' />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Gender</label> <br />
                                                        {/* <input type="text" class="form-control" placeholder="Gender" /> */}
                                                        <select class="form-control"
                                                            style={{ fontSize: 'unset' }}
                                                            value={createForm.gender}
                                                            onChange={inputChange}
                                                            name='gender'>
                                                            <option></option>
                                                            <option>Male</option>
                                                            <option>Female</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Passwod</label>
                                                        <input type="text" class="form-control"
                                                            value={createForm.password}
                                                            onChange={inputChange}
                                                            name='password' />
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label class="form-label">Role</label> <br />
                                                        <select class="form-control"
                                                            style={{ fontSize: 'unset' }}
                                                            value={createForm.role?.id}
                                                            onChange={inputChange}
                                                            name='role'>
                                                            <option value=''></option>
                                                            <option value='1' >USER</option>
                                                            <option value='2'>ADMIN</option>
                                                            <option value='3'>DOCTOR</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label class="form-label">Active</label> <br />
                                                        <select class="form-control"
                                                            style={{ fontSize: 'unset' }}
                                                            value={createForm.is_active}
                                                            onChange={inputChange}
                                                            name='active'>
                                                            <option></option>
                                                            <option value="true">Active</option>
                                                            <option value="false">Block</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="my-15">
                                            <div class="box-footer">
                                                <button type="button" class="btn btn-warning me-1" onClick={cancle} >
                                                    <i class="ti-trash"></i> Cancel
                                                </button>
                                                <button type="submit" class="btn btn-primary"
                                                    style={{ marginLeft: '10%' }}
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
    )
}

export default UserUpdate