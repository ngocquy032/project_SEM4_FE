import React, { useState } from 'react'
import { faCircleUser, faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navigate, useNavigate } from 'react-router-dom';
import All_API from '../../../../state/All_API';
import { ToastError, ToastSuccess } from '../../../../notification';

const UserAdd = () => {
    const styleButton = {
        fontSize: 'unset'
    }

    const navigate = useNavigate();
    const [createForm, setCreateForm] = useState({
        fullname: '',
        phone_number: '',
        email: '',
        address: '',
        password: '',
        birthday: '',
        gender: '',
        role_id: ''
    })
    const cancle = () => {
        navigate('/admin/userList')
    }
    const clearForm = () => {
        setCreateForm({
            fullname: '',
            phone_number: '',
            email: '',
            address: '',
            password: '',
            birthday: '',
            gender: '',
            role_id: ''
        })
    }


    const inputChange = (e) => {
        const { name, value } = e.target;
        setCreateForm({
            ...createForm,
            [name]: name === 'role_id' && value === '' ? '1' : value
        });
    }
    const onSave = async (e) => {
        e.preventDefault();
        console.log('aaa', createForm);
        try {
            const response = await All_API.createUser(createForm);
            if (response.data.status === "success") {
                clearForm();
                ToastSuccess(response.data.message)

            } else {
                ToastError(response.data.message)

            }
            console.log('Response from API:', response.data);
        } catch (error) {
            ToastError(error.response.data.message)
        }

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
                                        <li class="breadcrumb-item active" aria-current="page">Add User</li>
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
                                                            value={createForm.fullname}
                                                            onChange={inputChange}
                                                            name='fullname' />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Address</label>
                                                        <input type="text" class="form-control"
                                                            placeholder="Address"
                                                            value={createForm.address}
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
                                                            value={createForm.email}
                                                            onChange={inputChange}
                                                            name='email' />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Contact Number</label>
                                                        <input type="text" class="form-control"
                                                            placeholder="Phone"
                                                            value={createForm.phone_number}
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
                                                        <label class="form-label">Password</label>
                                                        <input type="text" class="form-control"
                                                            placeholder="Passwod"
                                                            value={createForm.password}
                                                            onChange={inputChange}
                                                            name='password' />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Roler</label> <br />
                                                        <select class="form-control"
                                                            style={{ fontSize: 'unset' }}
                                                            value={createForm.role_id}
                                                            onChange={inputChange}
                                                            name='role_id'>
                                                            <option value="" ></option>
                                                            <option value="1">USER</option>
                                                            <option value="2">ADMIN</option>
                                                            <option value="3">Doctor</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="my-15">
                                            <div class="box-footer">
                                                <button type="button" class="btn btn-warning m-10" onClick={cancle}>
                                                    <i class="ti-trash"></i> Cancel
                                                </button>
                                                <button type="submit" class="btn btn-primary"
                                                    onClick={onSave}>
                                                    <i class="ti-save-alt"></i> Save
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

export default UserAdd;