import React, { useEffect, useState } from 'react'
import { faCircleUser, faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import All_API from '../../../../state/All_API';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastError, ToastSuccess } from '../../../../notification';
import { convertDate } from '../../componets/ConvertData';

const UserUpdate = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [birthday, setBirthday] = useState()
    const [active,setActive] = useState(null)
    const [createForm, setCreateForm] = useState({
        fullname: '',
        address: '',
        email: '',
        phone_number: '',
        gender: '',
        password: '',
        role_id: '',
        is_active: ''
    });
    
   
    async function getUserById(userId) {
        try {
            const response = await All_API.getUserById(userId);
            if (response?.status === 200) {
                setCreateForm(response?.data?.data);
                setBirthday(convertDate(response?.data?.data.birthday))
                setActive(response?.data?.data?.is_active.toString())
            } else {
                ToastError(response?.data.status);
                navigate('/admin/userList');
            }
        } catch (error) {
            // ToastError("Please try again.")
            // navigate('/admin/userList');
        }
    }
    // call api
    useEffect(() => {
        getUserById(userId);
    }, []);
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
            birthday: birthday,
            gender: createForm.gender,
            role_id: createForm.role_id,
            active: active === "true",
            password: createForm.password  ? createForm.password : ""
        };

        try {
            const response = await All_API.updateUserByAdmin(userId, userData);
        if(response.data.status === "success") {
            ToastSuccess(response.data.message)
            navigate('/admin/userList')
            }else{
                ToastError(response.data.message)
            }
        } catch (error) {
            ToastError(error.response.data.message)
        }

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
                                        <li class="breadcrumb-item active" aria-current="page">Update User</li>
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
                                                            onChange={(e)=> setBirthday(e.target.value)}
                                                            name='birthday' />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Gender</label> <br />
                                                        {/* <input type="text" class="form-control" placeholder="Gender" /> */}
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
                                                            value={createForm?.password}
                                                            onChange={inputChange}
                                                            name='password' />
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label class="form-label">Role</label> <br />
                                                        <select class="form-control"
                                                            style={{ fontSize: 'unset' }}
                                                            value={createForm?.role?.id}
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
                                                            value={active}
                                                            onChange={(e)=>setActive(e.target.value)}
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
                                                <button type="button" class="btn btn-warning m-10" onClick={cancle} >
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
    )
}

export default UserUpdate