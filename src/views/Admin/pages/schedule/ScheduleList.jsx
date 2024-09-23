import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faCircleUser,
  faEye,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import All_API from "../../../../state/All_API";
import {
  convertToDateString,
  convertToTimeString,
} from "../../componets/ConvertData";
import { Pagination, Stack } from "@mui/material";
import DeleteLayout from "../../componets/DeleteLayout";
import { ToastError, ToastSuccess } from "../../../../notification";

const ScheduleList = () => {
  const displayStyle = {
    padding: ".25rem 0.5rem",
  };
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [idObject, setIdObject] = useState("");
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [specialtyId, setSpecialtyId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [dateSchedule, setDateSchedule] = useState("");
  const timeoutRef = useRef(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  async function getAllSchedule(data) {
    try {
      const response = await All_API.getScheduleAll(data);
      setSchedules(response.data.data.scheduleResponseList);
      setTotalPages(response.data.data.totalPages);
    } catch {}
  }

  async function getAllDoctor() {
    try {
      const response = await All_API.getDoctorFull();
      setDoctors(response.data.data.doctors);
    } catch {}
  }

  async function getAllSpecialty() {
    try {
      const response = await All_API.getSpecialtyFull();
      setSpecialties(response.data.data.specialtyList);
    } catch {}
  }

  async function deleteSchedule(id) {
    try {
      const response = await All_API.deleteScheduleById(id);
      if (response.data.status === "success") {
        ToastSuccess(response.data.message);
        handleLoading();
        handleDeleteClose();
      } else {
        ToastError(response.data.message);
        handleDeleteClose();
      }
    } catch (error) {
      ToastError(error.response.data.message);
      handleDeleteClose();
    }
  }

  const handlePaginate = (event, value) => {
    setPage(value - 1); // Cập nhật số trang hiện tại khi người dùng chuyển trang
  };

  const handleLimitChange = (e) => setLimit(e.target.value);
  const handleDoctorChange = (e) => setDoctorId(e.target.value);
  const handleSpecialtyChange = (e) => setSpecialtyId(e.target.value);
  const handleDateChange = (e) => setDateSchedule(e.target.value);
  const handleSearchChange = (e) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      setKeyword(e.target.value);
    }, 500);
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

  useEffect(() => {
    const data = {
      specialtyId: specialtyId || "",
      doctorId: doctorId || "",
      dateSchedule: dateSchedule || "",
      page: page,
      limit: limit,
      keyword: keyword,
    };

    getAllSchedule(data);
    getAllDoctor();
    getAllSpecialty();
  }, [keyword, limit, page, specialtyId, doctorId, dateSchedule, loading]);

  return (
    <div class="content-wrapper">
      <div class="container-full">
        {/* <!-- Content Header (Page header) --> */}
        <div class="content-header">
          <div class="d-flex align-items-center">
            <div class="me-auto">
              <h2 class="page-title">Schedule</h2>
              <div class="d-inline-block align-items-center">
                <nav>
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a>
                        <FontAwesomeIcon icon={faCircleUser} />
                      </a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Schedule List
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
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                    </select>
                  </div>

                  {/* Các phần tử ở bên phải */}
                  <div className="schedule-filter-right">
                    {/* Select DoctorId */}
                    <div className="schedule-filter-item">
                      <label
                        htmlFor="doctorId"
                        className="schedule-filter-label"
                      >
                        Doctor
                      </label>
                      <select
                        id="doctorId"
                        value={doctorId}
                        onChange={handleDoctorChange}
                        className="schedule-filter-select"
                      >
                        <option value="">Select Doctor</option>
                        {doctors?.map((doctor) => (
                          <option value={doctor?.id}>
                            {doctor?.user.fullname}
                          </option>
                        ))}
                      </select>
                    </div>

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

                    {/* Date Schedule */}
                    <div className="schedule-filter-item">
                      <label
                        htmlFor="dateSchedule"
                        className="schedule-filter-label"
                      >
                        Date Schedule
                      </label>
                      <input
                        type="date"
                        id="dateSchedule"
                        value={dateSchedule}
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
                <div class="box-body">
                  <div class="table-responsive rounded card-table">
                    <table class="table border-no" id="example1">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Doctor Name</th>
                          <th>Specialty Name</th>
                          <th>Date Schedule</th>
                          <th>Start Time</th>
                          <th>Booking Limit</th>

                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schedules?.map((schedule) => (
                          <tr class="hover-primary">
                            <td>#{schedule?.id}</td>
                            <td>{schedule?.doctor_name}</td>
                            <td>{schedule?.specialty_name}</td>
                            <td>
                              {convertToDateString(schedule?.date_schedule)}
                            </td>
                            <td>{convertToTimeString(schedule?.start_time)}</td>
                            <td>{schedule?.booking_limit}</td>
                            <td>
                              <div class="btn-group acion-admin-list">
                                <a
                                  style={displayStyle}
                                  onClick={() =>
                                    navigate(`/admin/schedules/${schedule?.id}`)
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
                                      `/admin/schedules/update/${schedule?.id}`
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
                                    setIdObject(schedule?.id);
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
          deleteFunction={deleteSchedule}
          onDelete={handleLoading}
        />
      )}
    </div>
  );
};

export default ScheduleList;
