import React from 'react'
import { faCircleUser, faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
// import '../../../../src/assets/admins/css/styleAdmin.css'


const UserList = () => {
    const displayStyle = {
        padding: '.25rem 0.5rem'
    }
    const navigate = useNavigate();

    const handerViewDetails = () =>{
        navigate('/admin/userDetails')

    }
    return (

        <div class="content-wrapper">
            <div class="container-full">
                {/* <!-- Content Header (Page header) --> */}
                <div class="content-header">
                    <div class="d-flex align-items-center">
                        <div class="me-auto">
                            <h2 class="page-title">Users</h2>
                            <div class="d-inline-block align-items-center">
                                <nav>
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a><FontAwesomeIcon icon={faCircleUser} /></a>
                                        </li>
                                        <li class="breadcrumb-item active" aria-current="page">UserList</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>

                    </div>
                </div>

                {/* <!-- Main content --> */}
                <section class="content">
                    <div class="row"  >
                        <div class="col-12">
                            <div class="box">
                                <div class="box-body">
                                    <div class="table-responsive rounded card-table">
                                        <table class="table border-no" id="example1">
                                            <thead>
                                                <tr>
                                                    <th>User ID</th>
                                                    <th>Full Name</th>
                                                    <th>Phone Number</th>
                                                    <th>Gender</th>
                                                    <th>Role</th>

                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="hover-primary">
                                                    <td>#p245879</td>
                                                    <td>Nguyen Ngoc Quy</td>
                                                    <td>0833691560</td>
                                                    <td>Male</td>
                                                    <td>User</td>
                                                    <td>
                                                        <div class="btn-group" >
                                                            <a style={displayStyle} href="" onClick={() => handerViewDetails()}>  <FontAwesomeIcon icon={faEye}  /></a>
                                                            <a style={displayStyle} href=""> <FontAwesomeIcon icon={faPen} /></a>
                                                            <a style={displayStyle} href=""><FontAwesomeIcon icon={faTrash} /></a>
                                                        </div>
                                                    </td> 
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- /.content --> */}
            </div>
        </div>


    )
}

export default UserList