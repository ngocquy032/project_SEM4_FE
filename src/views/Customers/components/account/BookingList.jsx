import React, { useEffect, useRef, useState } from "react";
import {
  faCircleUser,
  faEye,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BookingDetails from "./BookingDetails";
import { useNavigate } from "react-router-dom";
import { Pagination, Stack } from "@mui/material";
import All_API from "../../../../state/All_API";
import { ToastError, ToastSuccess } from "../../../../notification";
import { useSelector } from "react-redux";
import { GetUser } from "../../../../state/Auth/authUserSlice";
import { compareDateSchedule, compareDateTimeSchedule } from "../CovertFunction";
import FormBankModal from "./FormBankModal";
import FormChangeSchedule from "./FormChangeSchedule";


const BookingList = () => {
  const displayStyle = {
    padding: ".25rem 0.5rem",
  };
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [bookingList, setBookingList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [dateBooking, setDateBooking] = useState("");
  const timeoutRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const user = useSelector(GetUser);
  const [FormBank, setFormBank] = useState(false);
  const [FormRefundSc, setFormRefundSc] = useState(false);
  const [bookingOb, setBookingOb] = useState(null)


  const handlePaginate = (event, value) => {
    setPage(value - 1); // Cập nhật số trang hiện tại khi người dùng chuyển trang
  };


  

  const handleLoading = () => {
    setLoading(!loading);
  };

  const handleFormBankOpen = () => {
    setFormBank(true);
  };

  const handleFormBankClose = () => {
    setFormBank(false);
  };
  
  const handleFormRefundScOpen = () => {
    setFormRefundSc(true);
  };

  const handleFormRefundScClose = () => {
    setFormRefundSc(false);
  };

  const handleRefund = (userId, booking)=> {
    const diffInHours = compareDateTimeSchedule(booking)
    if (diffInHours < 2) {
      ToastError("No refunds are possible if the appointment time is less than 2 hours. You can change your appointment time once.")
      handleFormRefundScOpen()
    } else {
      handleFormBankOpen()
    }


  }

  bookingList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));


  
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


  

  useEffect(() => {
    const fetchUserAndBookings = async () => {
      try {
        // Fetch user details
        const userResponse = await All_API.getUserAPI(token);
        const userId = userResponse.data?.data.id;

        if (userId) {
          // Fetch user's booking list
          const response = await All_API.getBookingUser(token, userId);
          setBookingList(response.data?.data || []);
        }
      } catch (error) {
        ToastError("Failed to fetch booking list");
      }
    };

    if (token) {
      fetchUserAndBookings();
    }
  }, [token, loading, user]);

  return (
    <div>
      <div class="content-wrapper list-bk-user">
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
                          <option value="Wait Refund">WAIT REFUND</option>
                          <option value="Refunded">REFUNDED</option>
                        </select>
                      </div>
                      {/* Search */}
                      <div className="schedule-filter-item">
                        <label
                          htmlFor="search"
                          className="schedule-filter-label"
                        >
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
                            <th>Specialty</th>
                            <th>Amount</th>
                            <th>Payment Method</th>
                            <th>Payment Code</th>
                            <th>Status</th>

                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookingList?.map((booking) => (
                            <tr class="hover-primary">
                              <td>#{booking?.id}</td>
                              <td>{booking?.schedule.specialty_name}</td>
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
                                  <div
                                    class="appoits-button appoits-view btn-bk-user-ac"
                                    onClick={() =>
                                      navigate(
                                        `/account/bookings/${booking?.id}`
                                      )
                                    }
                                  >
                                    <button>View</button>
                                  </div>

                                  <div className="appoits-button appoits-rejected btn-bk-user-ac">
                                    <button
                                      disabled={booking?.status !== "paid" || compareDateSchedule(booking) || booking?.change_count !== 0 }
                                      onClick={() => {
                                        setBookingOb(booking)
                                        handleRefund(user?.id, booking)
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </div>
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

      {FormBank && (
        <FormBankModal
          open={FormBank}
          handleClose={handleFormBankClose}
          booking={bookingOb}
          isLoad={handleLoading}
          userId={user?.id}
        />
      )}

{FormRefundSc && (
        <FormChangeSchedule
          open={FormRefundSc}
          handleClose={handleFormRefundScClose}
          booking={bookingOb}
          isLoad={handleLoading}
          userId={user?.id}
        />
      )}
    </div>
  );
};

export default BookingList;
