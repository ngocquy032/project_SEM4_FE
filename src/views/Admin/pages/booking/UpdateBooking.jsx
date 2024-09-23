import React, { useEffect, useState } from "react";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import All_API from "../../../../state/All_API";
import { ToastError, ToastSuccess } from "../../../../notification";
import {
  convertToDateString,
  convertToTimeString,
} from "../../componets/ConvertData";

const UpdateBooking = () => {
  const { idBooking } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [status, setStatus] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

      updateBooking(idBooking, status);
    
  };

  async function updateBooking(idBooking, status) {
    try {
      const response = await All_API.updateBookingAdmin(idBooking, status);
      if (response.data.status === "success") {
        ToastSuccess(response.data.message);
        navigate("/admin/bookings");
      } else {
        ToastError(response.data.message);
      }
    } catch (error) {
      ToastError(error.response.data.message);
    }
  }

  async function getBookingById(idBooking) {
    try {
      const response = await All_API.getBookingByIdAdmin(idBooking);
      if (response.data.status === "success") {
        setBooking(response.data.data);
        setStatus(response.data.data.status);
      } else {
        ToastError(response.data.status);
        navigate("/admin/bookings");
      }
    } catch (error) {
      ToastError(error.response.data.message);
      navigate("/admin/bookings");
    }
  }

  useEffect(() => {
    getBookingById(idBooking);
  }, []);

  return (
    <div className="content-wrapper">
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h2 className="page-title">Booking</h2>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a>
                        <FontAwesomeIcon icon={faCircleUser} />
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Update Booking
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="row justify-content-center">
            <div className="col-8">
              <div className="box">
                <form className="form" onSubmit={handleSubmit}>
                  <div className="box-body">
                    <h4 className="box-title text-info mb-0">
                      <i className="ti-user me-15"></i> Booking Info
                    </h4>
                    <div className="my-15">
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="form-label">ID Booking</label>
                            <input
                              type="text"
                              class="form-control"
                              value={booking?.id}
                              name="id"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="form-label">Full Name</label>
                            <input
                              type="text"
                              class="form-control"
                              value={booking?.user.fullname}
                              name="fullName"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="form-label">Birthday</label>
                            <input
                              type="text"
                              class="form-control"
                              value={booking?.user.birthday}
                              name="birthday"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="form-label">Gender</label>
                            <input
                              type="text"
                              class="form-control"
                              value={booking?.user.gender}
                              name="gender"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="form-label">Email</label>
                            <input
                              type="text"
                              class="form-control"
                              value={booking?.user.email}
                              name="email"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="form-label">Phone</label>
                            <input
                              type="text"
                              class="form-control"
                              value={booking?.user.phone_number}
                              name="phone_number"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="form-label">Address</label>
                            <input
                              type="text"
                              class="form-control"
                              value={booking?.user.address}
                              name="birthday"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="form-label">Doctor Name</label>
                            <input
                              type="text"
                              class="form-control"
                              value={booking?.schedule.doctor_name}
                              name="doctor_name"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="form-label">Specialty Name</label>
                            <input
                              type="text"
                              class="form-control"
                              value={booking?.schedule.specialty_name}
                              name="specialty_name"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="form-label">Clinic Name</label>
                            <input
                              type="text"
                              class="form-control"
                              value={booking?.schedule.clinic_name}
                              name="phone_number"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="form-label">Date Schedule</label>
                            <input
                              type="text"
                              class="form-control"
                              value={convertToDateString(
                                booking?.schedule?.date_schedule
                              )}
                              name="date_schedule"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="form-label">Start Time</label>
                            <input
                              type="text"
                              class="form-control"
                              value={convertToTimeString(
                                booking?.schedule?.start_time
                              )}
                              name="start_time"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="form-label">End Time</label>
                            <input
                              type="text"
                              class="form-control"
                              value={convertToTimeString(
                                booking?.schedule?.end_time
                              )}
                              name="end_time"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="form-label">Amount</label>
                            <input
                              type="text"
                              class="form-control"
                              value={booking?.amount}
                              name="amount"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="form-label">Created At</label>
                            <input
                              type="text"
                              class="form-control"
                              value={booking?.created_at}
                              name="created_at"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="form-label">Updated At</label>
                            <input
                              type="text"
                              class="form-control"
                              value={booking?.updated_at}
                              name="end_time"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="form-label">Payment Method</label>
                            <input
                              type="text"
                              class="form-control"
                              value={booking?.payment_method}
                              name="payment_method"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="form-label">Payment Code</label>
                            <input
                              type="text"
                              class="form-control"
                              value={booking?.payment_code}
                              name="payment_code"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="form-label">Status</label>
                            <select
                              id="status"
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}
                              className="schedule-filter-select select-admin-form"
                              name="status"
                              required
                              disabled={status === "paid"}
                            >
                              <option value="pending">PENDING</option>
                              <option value="paid">PAID</option>
                              <option value="rejected">REJECTED</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="box-footer">
                    <button
                      type="button"
                      onClick={() => navigate("/admin/bookings")}
                      class="btn btn-warning me-10 "
                    >
                      <i class="ti-trash"></i> Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={status === "paid"}
                    >
                      <i className="ti-save-alt"></i> Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UpdateBooking;
