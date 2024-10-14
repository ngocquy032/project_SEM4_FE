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
import { ToastError, ToastSuccess } from "../../../../notification";

const BookingList = () => {
  const displayStyle = {
    padding: ".25rem 0.5rem",
  };
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [idObject, setIdObject] = useState("");
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [dateBooking, setDateBooking] = useState("");
  const timeoutRef = useRef(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function getAllBooking(data) {
    try {
      const response = await All_API.getAllBooking(data);
      setBookings(response.data.data.bookingList);
      setTotalPages(response.data.data.totalPages);
    } catch {}
  }

  const handlePaginate = (event, value) => {
    setPage(value - 1); // Cập nhật số trang hiện tại khi người dùng chuyển trang
  };

  const handleLimitChange = (e) => setLimit(e.target.value);
  const handleDateChange = (e) => setDateBooking(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);

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
      dateBooking: dateBooking || "",
      status: status || "",
      page: page,
      limit: limit,
      keyword: keyword,
    };
    getAllBooking(data);
  }, [keyword, limit, page, dateBooking, loading, status]);

  return (
    <div class="content-wrapper">
      <div class="container-full">
        {/* <!-- Content Header (Page header) --> */}
        <div class="content-header">
          <div class="d-flex align-items-center">
            <div class="me-auto">
              <h2 class="page-title">Booking</h2>
              <div class="d-inline-block align-items-center">
                <nav>
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a>
                        <FontAwesomeIcon icon={faCircleUser} />
                      </a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Booking List
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
                    {/* Date Schedule */}
                    <div className="schedule-filter-item">
                      <label
                        htmlFor="dateBooking"
                        className="schedule-filter-label"
                      >
                        Date Booking
                      </label>
                      <input
                        type="date"
                        id="dateBooking"
                        value={dateBooking}
                        onChange={handleDateChange}
                        className="schedule-filter-input"
                      />
                    </div>
                    <div className="schedule-filter-item">
                      <label
                        htmlFor="doctorId"
                        className="schedule-filter-label"
                      >
                        Status
                      </label>
                      <select
                        id="doctorId"
                        value={status}
                        onChange={handleStatusChange}
                        className="schedule-filter-select"
                      >
                        <option value="">Select Status</option>
                        <option value="pending">PENDING</option>
                        <option value="paid">PAID</option>
                        <option value="rejected">REJECTED</option>
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
                          <th>Amount</th>
                          <th>Payment Method</th>
                          <th>Payment Code</th>
                          <th>Status</th>

                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings?.map((booking) => (
                          <tr class="hover-primary">
                            <td>#{booking?.id}</td>
                            <td>{booking?.user.fullname}</td>
                            <td>${booking?.amount}</td>
                            <td>{booking?.payment_method}</td>
                            <td>{booking?.payment_code}</td>
                            <td>
                              <span
                                className={
                                  booking?.status === "pending"
                                  ? "badge badge-warning"
                                  : booking?.status === "paid"
                                    ? "badge badge-success"
                                    : booking?.status === "rejected"
                                      ? "badge badge-danger"
                                      : booking?.status === "Wait Refund"
                                        ? "badge badge-info"
                                        : booking?.status === "Refunded"
                                          ? "badge badge-primary"
                                          : ""
                                }
                              >
                                {booking?.status?.toUpperCase()}
                              </span>
                            </td>
                            <td>
                              <div class="btn-group acion-admin-list">
                                <a
                                  style={displayStyle}
                                  onClick={() =>
                                    navigate(`/admin/bookings/${booking?.id}`)
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
                                      `/admin/bookings/update/${booking?.id}`
                                    )
                                  }
                                >
                                  {" "}
                                  <FontAwesomeIcon
                                    icon={faPen}
                                    className="icon-actionAD"
                                  />
                                </a>
                                {/* <a style={displayStyle} onClick={()=>{
                                                        setIdObject(booking?.id)
                                                        handleDeleteOpen()
                                                      }}><FontAwesomeIcon icon={faTrash} className='icon-actionAD'/></a> */}
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
    </div>
  );
};

export default BookingList;
