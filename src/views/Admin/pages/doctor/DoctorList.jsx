import React, { useEffect, useRef, useState } from 'react'
import { faCircleUser, faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import All_API from '../../../../state/All_API';
import { ToastError, ToastSuccess } from '../../../../notification';
import { useNavigate } from 'react-router-dom';
import { Pagination, Stack } from '@mui/material';
import DeleteLayout from '../../componets/DeleteLayout';

const DoctorList = () => {


    const displayStyle = {
        padding: '.25rem 0.5rem'
    }
    const navigate = useNavigate()
    const [doctors, setDoctors] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [idObject, setIdObject] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [specialtyId, setSpecialtyId] = useState('')
    const [keyword, setKeyword] = useState("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef(null);




    async function getAllDoctor(data) {
            try{
              const response = await All_API.getAllDoctor(data)
              if(response.data.status === "success") {
                setDoctors(response.data.data.doctors)
                setTotalPages(response.data.data.totalPages);
              }else {
                 
              }
          }catch (error){
             
            }
          }

      async function getAllSpecialty() {
    try {
      const response = await All_API.getSpecialtyFull();
      setSpecialties(response.data.data.specialtyList);
    } catch {}
  }      

    const handleLimitChange = (e) => setLimit(e.target.value);
    const handlePaginate = (event, value) => {
        setPage(value - 1);
      };
      const handleDeleteOpen = () => {
        setOpenDeleteModal(true);
      };
      const handleDeleteClose = () => {
        setOpenDeleteModal(false);
      };
      const handleLoading = () => {
        setLoading(!loading);
      };
      const handleSpecialtyChange = (e) => setSpecialtyId(e.target.value);

      const handleSearchChange = (e) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
    
        // Set a new timeout
        timeoutRef.current = setTimeout(() => {
          setKeyword(e.target.value);
        }, 500);
      };

      async function deleteDoctor(id) {
        try {
          const response = await All_API.deleteDoctorById(id);
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
        const data = { page, limit,specialtyId, keyword };
        getAllDoctor(data)
        getAllSpecialty()
     }, [page, limit,specialtyId,  keyword, loading])     

    return ( 
        <div class="content-wrapper">
        <div class="container-full">
          {/* <!-- Content Header (Page header) --> */}
          <div class="content-header">
            <div class="d-flex align-items-center">
              <div class="me-auto ">
                <div>
                  {" "}
                  <h2 class="page-title">Doctor</h2>
                  <div class="d-inline-block align-items-center">
                    <nav>
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                          <a>
                            <FontAwesomeIcon icon={faCircleUser} />
                          </a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                          Doctor List
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
                          {/* Select SpecialtyId */}
                    <div className="schedule-filter-item">
                      <label
                        htmlFor="specialtyId"
                        className="schedule-filter-label"
                      >
                        Specialty
                      </label>
                      <select
                        id="specialtyId"
                        value={specialtyId}
                        onChange={handleSpecialtyChange}
                        className="schedule-filter-select"
                      >
                        <option value="">Select Specialty</option>
                        {specialties?.map((specialty) => (
                          <option value={specialty?.id}>
                            {specialty?.specialtyName}
                          </option>
                        ))}
                      </select>
                    </div>
                      {/* Search */}
                      <div className="schedule-filter-item">
                        <label htmlFor="search" className="schedule-filter-label">
                          Search
                        </label>
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
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Birthday</th>
                            <th>Phone</th>
                            <th>Specialty Name</th>
                            <th>Experience</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {doctors?.map((doctor) => (
                            <tr class="hover-primary">
                              <td>#{doctor?.id}</td>
                              <td>{doctor?.user?.fullname}</td>
                              <td>{doctor?.user?.birthday}</td>
                              <td>{doctor?.user?.phone_number}</td>
                              <td>{doctor?.specialty?.specialtyName}</td>
                              <td>{doctor?.experience} years</td>
                              <td>
                                <div class="btn-group acion-admin-list">
                                  <a
                                    style={displayStyle}
                                    onClick={() =>
                                      navigate(
                                        `/admin/doctors/${doctor?.id}`
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
                                        `/admin/doctors/update/${doctor?.id}`
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
                                      setIdObject(doctor?.id);
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
            deleteFunction={deleteDoctor}
          />
        )}
      </div>
    );
};

export default DoctorList