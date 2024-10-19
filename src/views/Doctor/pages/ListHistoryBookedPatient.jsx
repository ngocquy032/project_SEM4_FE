import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faEye,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import All_API from "../../../state/All_API";
import { GetInfoDoctor } from "../../../state/Auth/infoDoctorSlice";
import { convertDataToDateString, convertToTimeString } from "../../Admin/componets/ConvertData";
import { Pagination, Stack } from "@mui/material";
import PrescriptionViewDoctor from "../components/PrescriptionViewDoctor";

const ListHistoryBookedPatient = () => {
    const {idUser} = useParams();

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const timeoutRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [idObject , setIdObject] = useState('')

  

  const handleLimitChange = (e) => setLimit(e.target.value);

  const handlePaginate = (event, value) => {
    setPage(value - 1); // Cập nhật số trang hiện tại khi người dùng chuyển trang
  };

  const handleSearchChange = (e) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      setKeyword(e.target.value);
    }, 500);
  };

  const handleViewOpen = () => {
    setOpenViewModal(true);
  };

  const handleViewClose = () => {
    setOpenViewModal(false);
  };
  
  async function getHistoryByPatient(userId) {
    try {
      const response = await All_API.getHistoryByPatient(userId);
      setBookings(response.data.data)
      if(response.data.data)
      setLoading(true)
    } catch {}
  }




  useEffect(() => {
    getHistoryByPatient(idUser)
   
  }, []);

  return (
    <div class="content-wrapper">
      <div class="container-full">
        {/* <!-- Content Header (Page header) --> */}
        <div class="content-header">
          <div class="d-flex align-items-center">
            <div class="me-auto">
        
              <h2 class="page-title">History </h2>
              <div class="d-inline-block align-items-center">
                <nav>
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a>
                        <FontAwesomeIcon icon={faCircleUser} />
                      </a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                    PATIENT'S MEDICAL HISTORY
                    </li>
                  </ol>
                </nav>
              </div>
             
            </div>
             <button type='submit'  onClick={()=>navigate(-1)}
                                     className="btn btn-main btn-round-full  fl-sc-ad  ">Back<i
                                        className="icofont-simple-right  "></i></button>
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
                      <option value={10}>10</option>
                      <option value={15}>15</option>
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
                        onChange={handleSearchChange}
                        className="schedule-filter-input inputsearch-admin"
                      />
                    </div>
                  </div>
                </div>
                
                <div class="manage-patient-container">
                  <table class="manage-patient-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Patient's name</th>
                        <th>Birthday</th>
                        <th>Phone number</th>
                        <th>Gender</th>
                        <th  className="bk-address-dc">Address</th>
                        
                        <th>Reason for examination</th>
                        <th>Date</th>

                        <th>Prescription</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(bookings) && bookings.slice(0, -1).reverse()?.map((booking, index)=> (
                        <tr>
                        <td>{index+1}</td>
                        <td>{booking?.user.fullname}</td>
                        <td>{booking?.user.birthday}</td>
                        <td>{booking?.user.phone_number}</td>
                        <td>{booking?.user.gender}</td>
                        <td className="bk-address-dc">{booking?.user.address}</td>
                       
                        <td className="bk-reason-dc">{booking?.reason}</td>
                        <td >
                        { convertDataToDateString(booking?.schedule?.date_schedule)}

                        </td>
                        <td>
                          <a className="btn-view-dc" onClick={()=> {
                                  setIdObject(booking?.id)
                                  handleViewOpen()
                                  }}>View</a>
                        </td>
                      
                      </tr>
                      ))}
                   
                    </tbody>
                  </table>
                  
                </div>
                <div className="nav-page-dc">
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
        </section>
        {/* <!-- /.content --> */}
      </div>
      {openViewModal && (
        <PrescriptionViewDoctor
          open={openViewModal}
          handleClose={handleViewClose}
          idBooking={idObject}
        />
      )}
    </div>
  );
};

export default ListHistoryBookedPatient;
