import React from 'react'
import { faCircleUser, faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const userAdd = () => {
    const styleButton = {
        fontSize: 'unset'
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
                                                        <label class="form-label">First Name</label>
                                                        <input type="text" class="form-control" placeholder="First Name" />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Last Name</label>
                                                        <input type="text" class="form-control" placeholder="Last Name" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">E-mail</label>
                                                        <input type="text" class="form-control" placeholder="E-mail" />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Contact Number</label>
                                                        <input type="text" class="form-control" placeholder="Phone" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <h4 class="box-title text-info mb-0 mt-20"><i class="ti-save me-15"></i>
                                            Requirements</h4>
                                        <div class="my-15">
                                            <div class="form-group">
                                                <label class="form-label">Company</label>
                                                <input type="text" class="form-control" placeholder="Company Name" />
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Role</label>
                                                        <select class="form-select" style={{ fontSize: 'unset', margin: '0 20px' }}>
                                                            <option>choose the options</option>
                                                            <option>User</option>
                                                            <option>Admin</option>
                                                            <option>Doctor</option>
                                                            <option>illustration</option>
                                                            <option>branding</option>
                                                            <option>video</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Budget</label>
                                                        <select class="form-select">
                                                            <option>Budget</option>
                                                            <option>less than 5000$</option>
                                                            <option>5000$ - 10000$</option>
                                                            <option>10000$ - 20000$</option>
                                                            <option>more than 20000$</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div class="form-group">
                                                <label class="form-label">Select File</label>
                                                <label class="file">
                                                    <input type="file" id="file" />
                                                </label>
                                            </div> */}
                                            <div class="form-group">
                                                <label class="form-label">About Project</label>
                                                <textarea rows="5" class="form-control"
                                                    placeholder="About Project"></textarea>
                                            </div>

                                            {/* <!-- /.box-body --> */}
                                            <div class="box-footer">
                                                <button type="button" class="btn btn-warning me-1">
                                                    <i class="ti-trash"></i> Cancel
                                                </button>
                                                <button type="submit" class="btn btn-primary">
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

export default userAdd;