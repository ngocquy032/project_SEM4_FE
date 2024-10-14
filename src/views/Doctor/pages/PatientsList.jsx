import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { convertToTimeString } from "../../Admin/componets/ConvertData";
import { Pagination, Stack } from "@mui/material";
import PrescriptionViewDoctor from "../components/PrescriptionViewDoctor";

const PatientsList = () => {
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
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const timeoutRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const doctor = useSelector(GetInfoDoctor);
  const [selectedTime, setSelectedTime] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [idObject , setIdObject] = useState('')

  

  const handleLimitChange = (e) => setLimit(e.target.value);
  const handleDateChange = (event) => {
    const date = event.target.value; // Nhận chuỗi ngày từ input
    const formattedDate = date
      ? new Date(date).toISOString().split("T")[0]
      : null; // Chuyển chuỗi thành Date và định dạng
    setSelectedDate(formattedDate); // Lưu lại ngày đã format
  };

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
  

  async function getScheduleByDoctor(idDoctor, dateSchedule) {
    try {
      const response = await All_API.getScheduleByDoctor(
        idDoctor,
        dateSchedule
      );
      setSchedules(response.data.data)
      setLoading(true)
    } catch {}
  }


  async function getBookingByScheduleDoctor(data) {
    try {
      const response = await All_API.getBookingByScheduleDoctor(data);
      setBookings(response.data.data.bookingList);
      setTotalPages(response.data.data.totalPages);

    } catch {}
  }
 

  useEffect(() => {
    if (doctor?.id) {
      getScheduleByDoctor(doctor?.id, selectedDate);
    }

    if(schedules.length > 0) {
      const data = {
        page: page,
        limit: limit,
        keyword: keyword,
        scheduleId: selectedTime || schedules[0]?.id
      };
      getBookingByScheduleDoctor(data)
    }
   
   
  }, [doctor, selectedDate, keyword, loading, limit, page, selectedTime ]);

  return (
    <div class="content-wrapper">
      <div class="container-full">
        {/* <!-- Content Header (Page header) --> */}
        <div class="content-header">
          <div class="d-flex align-items-center">
            <div class="me-auto">
              <h2 class="page-title">Patient</h2>
              <div class="d-inline-block align-items-center">
                <nav>
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a>
                        <FontAwesomeIcon icon={faCircleUser} />
                      </a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      MANAGE PATIENT
                    </li>
                  </ol>
                </nav>
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
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                    </select>
                  </div>

                  {/* Các phần tử ở bên phải */}
                  <div className="schedule-filter-right">
                    {/* Date Schedule */}
                    <div className="schedule-filter-item">
                      <label
                        htmlFor="dateBooking"
                        className="schedule-filter-label"
                      >
                        Date Schedule
                      </label>
                      <input
                        type="date"
                        id="dateBooking"
                        dateFormat="yyyy-MM-dd"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="schedule-filter-input"
                      />
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
                <div className="list-schedule-dc">
                  <div className="form-group">
                    <div className="time-selection">
                      {schedules.map((schedule) => (
                        <div
                          key={schedule?.id}
                          className={`time-slot ${
                            selectedTime === schedule?.id ? "selected" : ""
                          } ${
                            schedule?.booking_limit === schedule?.number_booked
                              ? "disabled"
                              : ""
                          }`}
                          onClick={() => setSelectedTime(schedule.id)}
                          style={{
                            pointerEvents:
                              schedule?.booking_limit ===
                              schedule?.number_booked
                                ? "none"
                                : "auto",
                          }}
                        >
                          {convertToTimeString(schedule?.start_time)} -{" "}
                          {convertToTimeString(schedule?.end_time)}
                        </div>
                      ))}
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
                        <th>Prescription</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings?.map((booking, index)=> (
                        <tr>
                        <td>{index+1}</td>
                        <td>{booking?.user.fullname}</td>
                        <td>{booking?.user.birthday}</td>
                        <td>{booking?.user.phone_number}</td>
                        <td>{booking?.user.gender}</td>
                        <td className="bk-address-dc">{booking?.user.address}</td>
                        <td className="bk-reason-dc">{booking?.reason}</td>

                        <td>
                          <a className="btn-view-dc" onClick={()=> {
                                  setIdObject(booking?.id)
                                  handleViewOpen()
                                  }}>View</a>
                        </td>
                        <td class="manage-patient-actions">
                          <button class="manage-patient-cancel" onClick={()=> navigate(`/doctor/patients/${booking?.id}`)}>Medical Exam Record</button>
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

export default PatientsList;
