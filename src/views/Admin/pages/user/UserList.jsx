import React, { useEffect, useRef, useState } from 'react'
import { faCircleUser, faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import All_API from '../../../../state/All_API';
import { ToastError, ToastSuccess } from '../../../../notification';
import DeleteLayout from '../../componets/DeleteLayout';
import { Pagination, Stack } from '@mui/material';
// import '../../../../src/assets/admins/css/styleAdmin.css'


const UserList = () => {
    const displayStyle = {
        padding: '.25rem 0.5rem'
    }
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [keyword, setKeyword] = useState('');
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [idObject, setIdObject] = useState('');
    const timeoutRef = useRef(null);





    const handleDeleteOpen = () => {
        setOpenDeleteModal(true);
        };
      const handleDeleteClose = () => {
        setOpenDeleteModal(false);
      };

      const handleLimitChange = (e) => setLimit(e.target.value);
      const handleSearchChange = (e) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
      
          // Set a new timeout
          timeoutRef.current = setTimeout(() => {
            setKeyword(e.target.value);
          }, 500);
      };

      const handlePaginate = (event, value) => {
        setPage(value - 1); // Cập nhật số trang hiện tại khi người dùng chuyển trang
      };

      async function deleteUser(id) {
        try{
          const response = await All_API.deleteUserById(id)
          if(response.data.status === "success") {
            ToastSuccess(response.data.message)
            handleLoading()
            handleDeleteClose()
          }else {
            ToastError(response.data.message)
            handleDeleteClose()
          }
        }catch (error) {
              ToastError(error.response.data.message);
          handleDeleteClose()
      
        }
      }

      const handleLoading = ()=> {
        setLoading(!loading)
        }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = { page, limit, keyword };
                const response = await All_API.getAllUsers(data);
                if (response.data && response.data.data) {
                    setUsers(response.data.data.users);
                    setTotalPages(response.data.data.totalPages);
                } else {
                    setUsers([]); // Xử lý trường hợp không có dữ liệu
                }

            } catch (error) {
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
                <td>#{user?.id}</td>
                <td>{user?.fullname}</td>
                <td>{user?.phone_number}</td>
                <td>{user?.gender || 'N/A'}</td>
                <td>{user?.role.name}</td>

                <td>
                    <div className="btn-group">
                        <a style={displayStyle} href="#" onClick={(e) => { e.preventDefault(); handleViewDetails(user?.id); }}>
                            <FontAwesomeIcon icon={faEye} />
                        </a>
                        <a style={displayStyle} href="#" onClick={(e) =>{e.preventDefault(); handleEditUser(user?.id); }}>
                            <FontAwesomeIcon icon={faPen} />
                        </a>
                        <a style={displayStyle} href="#" onClick={()=>{
                                                        setIdObject(user?.id)
                                                        handleDeleteOpen()
                                                      }}
                        >
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
                            <div className="schedule-filter-container">
      {/* Select Limit (bên trái) */}
      <div className="schedule-filter-limit">
        <label htmlFor="limit" className="schedule-filter-label">Limit</label>
        <select
          id="limit"
          value={limit}
          onChange={handleLimitChange}
          className="schedule-filter-select"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* Các phần tử ở bên phải */}
      <div className="schedule-filter-right">
     
        {/* Search */}
        <div className="schedule-filter-item">
          <label htmlFor="search" className="schedule-filter-label">Search</label>
          <input
            type="text"
            id="search"
            onChange={handleSearchChange}
            className="schedule-filter-input inputsearch-admin"
          />
        </div>
      </div>
    </div>
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
                                    <Stack
                    spacing={2}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Pagination
                      count={totalPages}
                      page={page+1}
                      onChange={handlePaginate}
                    />
                  </Stack>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- /.content --> */}
            </div>
            {openDeleteModal && <DeleteLayout  open={openDeleteModal} handleClose={handleDeleteClose} idObject={idObject} deleteFunction={deleteUser} onDelete={handleLoading}/>}

        </div>


    )
}

export default UserList