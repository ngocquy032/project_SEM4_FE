import React from 'react'
import { faCircleUser, faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import '../../../../src/assets/admins/css/styleAdmin.css'


const userList = () => {
    const displayStyle = {
        padding: '.25rem 0.5rem'
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
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Phone Number</th>
                                                    <th>Gender</th>
                                                    <th>Role</th>
                                                   
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="hover-primary">
                                                    <td>#p245879</td>
                                                    <td>Nguyen</td>
                                                    <td>Quy</td>
                                                    <td>0833691560</td>
                                                    <td>Male</td>
                                                    <td>User</td>
                                                    <td>
                                                        <div class="btn-group" >
                                                            <a style={displayStyle} href="#">  <FontAwesomeIcon icon={faEye} /></a>
                                                            <a style={displayStyle} href="#"> <FontAwesomeIcon icon={faPen} /></a>
                                                            <a style={displayStyle} href="#"><FontAwesomeIcon icon={faTrash} /></a>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr class="hover-primary">
                                                    <td>#p245880</td>
                                                    <td>18 April 2021, 11:30 AM</td>
                                                    <td>Mical clark</td>
                                                    <td>Dr. Aiden Doe</td>
                                                    <td>Diabetes</td>
                                                    <td>Doctor</td>
                                                    <td>
                                                        <div class="btn-group" >
                                                            <a style={displayStyle} href="#">  <FontAwesomeIcon icon={faEye} /></a>
                                                            <a style={displayStyle} href="#"> <FontAwesomeIcon icon={faPen} /></a>
                                                            <a style={displayStyle} href="#"><FontAwesomeIcon icon={faTrash} /></a>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr class="hover-primary">
                                                    <td>#p245881</td>
                                                    <td>22 May 2021, 15:30 PM</td>
                                                    <td>Stela clark</td>
                                                    <td>Dr. Lalvani doe</td>
                                                    <td>Hearing Loss</td>
                                                    <td><span class="badge badge-danger-light">New Patient</span></td>
                                                    <td>
                                                        <div class="btn-group">
                                                            <a class="hover-primary dropdown-toggle no-caret"
                                                                data-bs-toggle="dropdown"><i
                                                                    class="fa fa-ellipsis-h"></i></a>
                                                            <div class="dropdown-menu">
                                                                <a class="dropdown-item" href="#">View Details</a>
                                                                <a class="dropdown-item" href="#">Edit</a>
                                                                <a class="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr class="hover-primary">
                                                    <td>#p245882</td>
                                                    <td>26 April 2021, 10:30 AM</td>
                                                    <td>Boone Doe</td>
                                                    <td>Dr. Don Paton</td>
                                                    <td>Allergies & Asthma</td>
                                                    <td><span class="badge badge-danger-light">New Patient</span></td>
                                                    <td>
                                                        <div class="btn-group">
                                                            <a class="hover-primary dropdown-toggle no-caret"
                                                                data-bs-toggle="dropdown"><i
                                                                    class="fa fa-ellipsis-h"></i></a>
                                                            <div class="dropdown-menu">
                                                                <a class="dropdown-item" href="#">View Details</a>
                                                                <a class="dropdown-item" href="#">Edit</a>
                                                                <a class="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr class="hover-primary">
                                                    <td>#p245883</td>
                                                    <td>30 April 2021, 10:30 AM</td>
                                                    <td>Carlie Paton</td>
                                                    <td>Dr. Mical Doe</td>
                                                    <td>Sleep Problem</td>
                                                    <td><span class="badge badge-warning-light">In Treatment</span></td>
                                                    <td>
                                                        <div class="btn-group">
                                                            <a class="hover-primary dropdown-toggle no-caret"
                                                                data-bs-toggle="dropdown"><i
                                                                    class="fa fa-ellipsis-h"></i></a>
                                                            <div class="dropdown-menu">
                                                                <a class="dropdown-item" href="#">View Details</a>
                                                                <a class="dropdown-item" href="#">Edit</a>
                                                                <a class="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr class="hover-primary">
                                                    <td>#p245884</td>
                                                    <td>1 May 2021, 10:30 AM</td>
                                                    <td>Delilah</td>
                                                    <td>Dr. Johen Doe</td>
                                                    <td>Dental Care</td>
                                                    <td><span class="badge badge-success-light">Recovered</span></td>
                                                    <td>
                                                        <div class="btn-group">
                                                            <a class="hover-primary dropdown-toggle no-caret"
                                                                data-bs-toggle="dropdown"><i
                                                                    class="fa fa-ellipsis-h"></i></a>
                                                            <div class="dropdown-menu">
                                                                <a class="dropdown-item" href="#">View Details</a>
                                                                <a class="dropdown-item" href="#">Edit</a>
                                                                <a class="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr class="hover-primary">
                                                    <td>#p245885</td>
                                                    <td>2 May 2021, 10:30 AM</td>
                                                    <td>Hannah Doe</td>
                                                    <td>Dr. Jennifer Ruby</td>
                                                    <td>Diabetes</td>
                                                    <td><span class="badge badge-warning-light">In Treatment</span></td>
                                                    <td>
                                                        <div class="btn-group">
                                                            <a class="hover-primary dropdown-toggle no-caret"
                                                                data-bs-toggle="dropdown"><i
                                                                    class="fa fa-ellipsis-h"></i></a>
                                                            <div class="dropdown-menu">
                                                                <a class="dropdown-item" href="#">View Details</a>
                                                                <a class="dropdown-item" href="#">Edit</a>
                                                                <a class="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr class="hover-primary">
                                                    <td>#p245886</td>
                                                    <td>3 May 2021, 10:30 AM</td>
                                                    <td>Emerson Clark</td>
                                                    <td>Dr. Alex Siauw</td>
                                                    <td>Covid-19 Suspect</td>
                                                    <td><span class="badge badge-warning-light">In Treatment</span></td>
                                                    <td>
                                                        <div class="btn-group">
                                                            <a class="hover-primary dropdown-toggle no-caret"
                                                                data-bs-toggle="dropdown"><i
                                                                    class="fa fa-ellipsis-h"></i></a>
                                                            <div class="dropdown-menu">
                                                                <a class="dropdown-item" href="#">View Details</a>
                                                                <a class="dropdown-item" href="#">Edit</a>
                                                                <a class="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr class="hover-primary">
                                                    <td>#p245887</td>
                                                    <td>4 May 2021, 10:30 AM</td>
                                                    <td>Crystal Doe</td>
                                                    <td>Dr. Samuel Jr.</td>
                                                    <td>Cold & Flu</td>
                                                    <td><span class="badge badge-success-light">Recovered</span></td>
                                                    <td>
                                                        <div class="btn-group">
                                                            <a class="hover-primary dropdown-toggle no-caret"
                                                                data-bs-toggle="dropdown"><i
                                                                    class="fa fa-ellipsis-h"></i></a>
                                                            <div class="dropdown-menu">
                                                                <a class="dropdown-item" href="#">View Details</a>
                                                                <a class="dropdown-item" href="#">Edit</a>
                                                                <a class="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr class="hover-primary">
                                                    <td>#p245888</td>
                                                    <td>5 May 2021, 10:30 AM</td>
                                                    <td>Jenny don</td>
                                                    <td>Dr. Widan Cheeh</td>
                                                    <td>Cold & Flu</td>
                                                    <td><span class="badge badge-warning-light">In Treatment</span></td>
                                                    <td>
                                                        <div class="btn-group">
                                                            <a class="hover-primary dropdown-toggle no-caret"
                                                                data-bs-toggle="dropdown"><i
                                                                    class="fa fa-ellipsis-h"></i></a>
                                                            <div class="dropdown-menu">
                                                                <a class="dropdown-item" href="#">View Details</a>
                                                                <a class="dropdown-item" href="#">Edit</a>
                                                                <a class="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr class="hover-primary">
                                                    <td>#p245889</td>
                                                    <td>6 May 2021, 10:30 AM</td>
                                                    <td>Joanne Clark</td>
                                                    <td>Dr. Samantha</td>
                                                    <td>Dental Care</td>
                                                    <td><span class="badge badge-danger-light">New Patient</span></td>
                                                    <td>
                                                        <div class="btn-group">
                                                            <a class="hover-primary dropdown-toggle no-caret"
                                                                data-bs-toggle="dropdown"><i
                                                                    class="fa fa-ellipsis-h"></i></a>
                                                            <div class="dropdown-menu">
                                                                <a class="dropdown-item" href="#">View Details</a>
                                                                <a class="dropdown-item" href="#">Edit</a>
                                                                <a class="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr class="hover-primary">
                                                    <td>#p245890</td>
                                                    <td>6 May 2021, 10:30 AM</td>
                                                    <td>Madeline doe</td>
                                                    <td>Dr. Widan Cheeh</td>
                                                    <td>Allergies & Asthma</td>
                                                    <td><span class="badge badge-warning-light">In Treatment</span></td>
                                                    <td>
                                                        <div class="btn-group">
                                                            <a class="hover-primary dropdown-toggle no-caret"
                                                                data-bs-toggle="dropdown"><i
                                                                    class="fa fa-ellipsis-h"></i></a>
                                                            <div class="dropdown-menu">
                                                                <a class="dropdown-item" href="#">View Details</a>
                                                                <a class="dropdown-item" href="#">Edit</a>
                                                                <a class="dropdown-item" href="#">Delete</a>
                                                            </div>
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

export default userList