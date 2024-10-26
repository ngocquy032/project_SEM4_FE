import React, { useEffect, useState } from "react";
import All_API from "../../state/All_API";
import { API_BASE_URL } from "../../config/apiConfig";
import { faEye, faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Tooltip } from "@mui/material";
const Dashboard = () => {
  const displayStyle = {
    padding: ".25rem 0.5rem",
  };
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [bookings, setBookings] = useState([]);
  const [dateBooking, setDateBooking] = useState(formatDate(new Date()));
  const [doctors, setDoctors] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();
  const [bookingWeek, setBookingWeek] = useState([]);

  async function getAllBooking(data) {
    try {
      const response = await All_API.getAllBooking(data);
      setBookings(response.data.data.bookingList);
    } catch {}
  }

  async function getAllDoctor(data) {
    try {
      const response = await All_API.getAllDoctor(data);
      if (response.data.status === "success") {
        setDoctors(response.data.data.doctors);
      } else {
      }
    } catch (error) {}
  }

  async function getAllSchedule(data) {
    try {
      const response = await All_API.getScheduleAll(data);
      setSchedules(response.data.data.scheduleResponseList);
    } catch {}
  }

  async function getAllBookingForWeek() {
    try {
      const response = await All_API.getAllBookingForWeek();
      setBookingWeek(response.data.data);
    } catch {}
  }

  const uniqueSchedules = schedules.filter(
    (schedule, index, self) =>
      index === self.findIndex((s) => s.doctor_id === schedule.doctor_id)
  );

  const today1 = new Date();
  let totalsByDay = Array(7).fill(0);
  let bookingsCountByDay = Array(7).fill(0);

  // Lặp qua từng đơn hàng để tính tổng doanh thu và số lượng đơn hàng cho 7 ngày qua
  bookingWeek.forEach((booking) => {
    const orderDate = new Date(booking.created_at);
    const dayDiff = Math.floor((today1 - orderDate) / (1000 * 60 * 60 * 24));

    // Kiểm tra nếu đơn hàng nằm trong khoảng 7 ngày qua
    if (dayDiff >= 0 && dayDiff < 7) {
      totalsByDay[6 - dayDiff] += booking.amount; // Cộng tổng doanh thu vào vị trí tương ứng
      bookingsCountByDay[6 - dayDiff] += 1; // Tăng số lượng đơn hàng
    }
  });

  // Định dạng kết quả theo ngày và tổng doanh thu
  const result1 = totalsByDay.map((total, index) => {
    const date = new Date(today1);
    date.setDate(today1.getDate() - (6 - index));

    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;

    return {
      name: formattedDate, // Ngày
      revenue: total, // Tổng doanh thu
      appoinment: bookingsCountByDay[index], // Số lượng đơn hàng
    };
  });

  useEffect(() => {
    const data = {
      dateBooking: dateBooking || "",
      status: "paid",
      limit: "",
      page: "",
      keyword: "",
    };
    const dataDotor = { page: "", limit: "", specialtyId: "", keyword: "" };

    const dataSchedule = {
      specialtyId: "",
      doctorId: "",
      dateSchedule: dateBooking || "",
      page: 0,
      limit: 10,
      keyword: "",
    };
    getAllSchedule(dataSchedule);
    getAllDoctor(dataDotor);
    getAllBooking(data);
    getAllBookingForWeek();
  }, [dateBooking]);

  return (
    <div class="content-wrapper">
      <div class="container-full">
        <section class="content">
          <div class="row">
            <div class="col-lg-4 col-12">
              <div class="box">
                <div class="box-body">
                  <div class="d-flex align-items-center">
                    <div class="me-15">
                      <img
                        src="/admin/images/icons/icon1ad.svg"
                        alt=""
                        class="w-120"
                      />
                    </div>
                    <div>
                      <h4 class="mb-0">Total Appoinment</h4>
                      <h3 class="mb-0">{bookings?.length}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-12">
              <div class="box">
                <div class="box-body">
                  <div class="d-flex align-items-center">
                    <div class="me-15">
                      <img
                        src="/admin/images/icons/icon2ad.svg"
                        alt=""
                        class="w-120"
                      />
                    </div>
                    <div>
                      <h4 class="mb-0">Total Doctors</h4>
                      <h3 class="mb-0">{doctors.length}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-12">
              <div class="box">
                <div class="box-body">
                  <div class="d-flex align-items-center">
                    <div class="me-15">
                      <img
                        src="/admin/images/icons/icon3ad.svg"
                        alt=""
                        class="w-100 icon-ad-ds"
                      />
                    </div>
                    <div>
                      <h4 class="mb-0">Total Revenue</h4>
                      <h3 class="mb-0">
                        $
                        {bookings.reduce(
                          (total, item) => total + item.amount,
                          0
                        )}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div class="col-xxxl-12 col-xl-8 col-12">
              <div class="row">
                <div class="col-xl-12 col-12">
                  <div class="box">
                    <div class="box-header chart-ad-ds-hd">
                      <h4 class="box-title ">Appoinment Statistics</h4>
                    </div>
                    <div class="box-body chart-ad-ds">
                      <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={result1}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#8884d8"
                          />
                          <Line
                            type="monotone"
                            dataKey="appoinment"
                            stroke="#82ca9d"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="box">
                    <div class="box-header with-border">
                      <h4 class="box-title">Appoinment Patient</h4>
                      <div class="box-controls pull-right"></div>
                    </div>
                    <div class="box-body no-padding">
                      <div class="table-responsive rounded card-table">
                        <table class="table border-no" id="example1">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Full Name</th>
                              <th>Amount</th>
                              <th>Payment Method</th>
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
                                        navigate(
                                          `/admin/bookings/${booking?.id}`
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
                    </div>
                    <div class="box-footer bg-light py-10 with-border">
                      <div class="d-flex align-items-center justify-content-between"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xxxl-3 col-xl-4 col-12">
              <div class="box">
                <div class="box-header with-border">
                  <h4 class="box-title">Doctor List</h4>
                  <p class="mb-0 pull-right">Today</p>
                </div>
                <div class="box-body">
                  <div class="inner-user-div3">
                    {uniqueSchedules?.map((schedule) => (
                      <div class="d-flex align-items-center mb-30">
                        <div class="me-15">
                          <img
                            src={`${API_BASE_URL}images/view/${schedule?.avatar}`}
                            class="avatar avatar-lg rounded10 bg-primary-light"
                            alt=""
                          />
                        </div>
                        <div class="d-flex flex-column flex-grow-1 fw-500">
                          <a
                            href="#"
                            class="text-dark hover-primary mb-1 fs-16"
                          >
                            {schedule?.doctor_name}
                          </a>
                          <span class="text-fade">
                            {schedule?.specialty_name}
                          </span>
                        </div>
                        <div class="dropdown">
                          <a
                            class="px-10 pt-5"
                            href="#"
                            data-bs-toggle="dropdown"
                          >
                            <i class="ti-more-alt"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-end">
                            <a class="dropdown-item flexbox" href="#">
                              <span>Inbox</span>
                              <span class="badge badge-pill badge-info">5</span>
                            </a>
                            <a class="dropdown-item" href="#">
                              Sent
                            </a>
                            <a class="dropdown-item" href="#">
                              Spam
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item flexbox" href="#">
                              <span>Draft</span>
                              <span class="badge badge-pill badge-default">
                                1
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
