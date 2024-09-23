import React, { useEffect, useState } from 'react'
import { faCircleUser, faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import All_API from '../../../../state/All_API';
import { ToastError, ToastSuccess } from '../../../../notification';
import { useNavigate } from 'react-router-dom';
import { Pagination, Stack } from '@mui/material';
import DeleteLayout from '../../componets/DeleteLayout';

const SpecialtyList = () => {


    const displayStyle = {
        padding: '.25rem 0.5rem'
    }
    const navigate = useNavigate()
    const [specialties, setSpecialties] = useState([]);
    const [idObject, setIdObject] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [keyword, setKeyword] = useState("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);




    async function getSpecialtiesAll(data) {
            try{
              const response = await All_API.getAllSpecialty(data)
              if(response.data.status === "success") {
                setSpecialties(response.data.data.specialtyList)
                setTotalPages(response.data.data.totalPages);
              }else {
                 
              }
          }catch (error){
             
            }
          }

    const handleLimitChange = (e) => setLimit(e.target.value);
    const handlePaginate = (event, value) => {
        setPage(value - 1); // Cập nhật số trang hiện tại khi người dùng chuyển trang
      };
      const handleDeleteOpen = () => {
        setOpenDeleteModal(true);
      };
      const handleDeleteClose = () => {
        setOpenDeleteModal(false);
      };
      const handleLoading = () => {
        setLoading(!loading);
        console.log("ccc")
      };
    
      async function deleteSpecialty(id) {
        try {
          const response = await All_API.deleteSpecialtyById(id);
          if (response.data.status === "success") {
            ToastSuccess(response.data.message);
            handleDeleteClose();
            handleLoading()
            
          } else {
            ToastError(response.data.message);
            handleDeleteClose();
          }
        } catch (error) {
          ToastError(error.response.data.message);
          handleDeleteClose();
        }
      }  

     useEffect(()=> {
        const data = { page, limit, keyword };
        getSpecialtiesAll(data)
     }, [page, limit, keyword, loading])     

    return ( 
        <div class="content-wrapper">
        <div class="container-full">
          {/* <!-- Content Header (Page header) --> */}
          <div class="content-header">
            <div class="d-flex align-items-center">
              <div class="me-auto ">
                <div>
                  {" "}
                  <h2 class="page-title">Specialty</h2>
                  <div class="d-inline-block align-items-center">
                    <nav>
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                          <a>
                            <FontAwesomeIcon icon={faCircleUser} />
                          </a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                          Specialty List
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
  
              
              </div>
            </div>
          </div>
  
          {/* <!-- Main content --> */}
          <section class="content">
            <div class="row">
              <div class="col-12">
                <div class="box">
                  <div className="schedule-filter-container">
                    {/* Select Limit (bên trái) */}
                    <div className="schedule-filter-limit">
                      <label htmlFor="limit" className="schedule-filter-label">
                        Limit
                      </label>
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
                        <label htmlFor="search" className="schedule-filter-label">
                          Search
                        </label>
                        <input
                          type="text"
                          id="search"
                          onChange={(e) => setKeyword(e.target.value)}
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
                            <th>ID</th>
                            <th>Specialty Name</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {specialties?.map((specialty) => (
                            <tr class="hover-primary">
                              <td>#{specialty?.id}</td>
                              <td>{specialty?.specialtyName}</td>
                              <td>
                                <div class="btn-group acion-admin-list">
                                  <a
                                    style={displayStyle}
                                    onClick={() =>
                                      navigate(
                                        `/admin/specialties/${specialty?.id}`
                                      )
                                    }
                                  >
                                    {" "}
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="icon-actionAD"
                                    />
                                  </a>
                                  <a
                                    style={displayStyle}
                                    onClick={() =>
                                      navigate(
                                        `/admin/specialties/update/${specialty?.id}`
                                      )
                                    }
                                  >
                                    {" "}
                                    <FontAwesomeIcon
                                      icon={faPen}
                                      className="icon-actionAD"
                                    />
                                  </a>
                                  <a
                                    style={displayStyle}
                                    onClick={() => {
                                      setIdObject(specialty?.id);
                                      handleDeleteOpen();
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      className="icon-actionAD"
                                    />
                                  </a>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div>
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
                          page={page + 1}
                          onChange={handlePaginate}
                        />
                      </Stack>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- /.content --> */}
        </div>
  
     
        {openDeleteModal && (
          <DeleteLayout
            open={openDeleteModal}
            handleClose={handleDeleteClose}
            idObject={idObject}
            onDelete={handleLoading}
            deleteFunction={deleteSpecialty}
          />
        )}
      </div>
    );
};

export default SpecialtyList