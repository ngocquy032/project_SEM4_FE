import React, { useEffect, useState } from 'react'
import { faCircleUser, faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import All_API from '../../../../state/All_API';
import { ToastError, ToastSuccess } from '../../../../notification';
// import '../../../../src/assets/admins/css/styleAdmin.css'


const UserList = () => {
    const displayStyle = {
        padding: '.25rem 0.5rem'
    }
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [page, setPage] = useState('');
    const [limit] = useState(''); // Số lượng người dùng trên mỗi trang
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = { page, limit, keyword };
                const response = await All_API.getAllUsers(data);
                if (response.data && response.data.data) {
                    setUsers(response.data.data.users);
                } else {
                    ToastError(response.data.message)
                    setUsers([]);
                }
                console.log('aaaa', response.data.data);
                console.log('response', response);

            } catch (error) {
                console.error('Failed to fetch users:', error);
                ToastError(error.response.data.message)
                setUsers([]);
            }
        }
        fetchUsers();
    }, [page, limit, keyword]);

    const handleViewDetails = (userId) => {
        navigate(`/admin/userDetails/${userId}`)
        // navigate('/admin/userDetails')

    }
    const handleEditUser = (userId) =>{
        navigate(`/admin/userUpdate/${userId}`)
    }
    // Tạo một mảng các phần tử React bằng cách sử dụng forEach
    let userRows = [];
    users.forEach((user) => {
        userRows.push(
            <tr className="hover-primary" key={user.id}>
                <td>#{user.id}</td>
                <td>{user.fullname}</td>
                <td>{user.phone_number}</td>
                <td>{user.gender || 'N/A'}</td>
                <td>{user.role.name}</td>
                <td>
                    <div className="btn-group">
                        <a style={displayStyle} href="#" onClick={(e) => { e.preventDefault(); handleViewDetails(user.id); }}>
                            <FontAwesomeIcon icon={faEye} />
                        </a>
                        <a style={displayStyle} href="#" onClick={(e) =>{e.preventDefault(); handleEditUser(user.id); }}>
                            <FontAwesomeIcon icon={faPen} />
                        </a>
                        <a style={displayStyle} href="#">
                            <FontAwesomeIcon icon={faTrash} />
                        </a>
                    </div>
                </td>
            </tr>
        );
    });
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
                                                {userRows.length > 0 ? userRows : (
                                                    <tr>
                                                        <td colSpan="6">No users found.</td>
                                                    </tr>
                                                )}
                                                {/* {users.map((user) => (
                                                    <tr class="hover-primary" key={user.id}>
                                                        <td>#{user.id}</td>
                                                        <td>{user.fullname}</td>
                                                        <td>{user.phone_number}</td>
                                                        <td>{user.gender}</td>
                                                        <td>{user.role.name}</td>
                                                        <td>
                                                            <div class="btn-group" >
                                                                <a style={displayStyle} href="" onClick={() => handerViewDetails()}>  <FontAwesomeIcon icon={faEye} /></a>
                                                                <a style={displayStyle} href=""> <FontAwesomeIcon icon={faPen} /></a>
                                                                <a style={displayStyle} href=""><FontAwesomeIcon icon={faTrash} /></a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                                    //  : (
                                                    //     <tr>
                                                    //         <td colSpan="6">No users found.</td>
                                                    //     </tr>
                                                    // )
                                                } */}
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