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

const DoctorSchedule = () => {
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const timeoutRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const doctor = useSelector(GetInfoDoctor);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = (event) => {
    const date = event.target.value; // Nhận chuỗi ngày từ input
    const formattedDate = date
      ? new Date(date).toISOString().split("T")[0]
      : null; // Chuyển chuỗi thành Date và định dạng
    setSelectedDate(formattedDate); // Lưu lại ngày đã format
  };


 


  async function getScheduleByDoctor(idDoctor, dateSchedule) {
    try {
      const response = await All_API.getScheduleByDoctor(
        idDoctor,
        dateSchedule
      );
      setSchedules(response.data.data)
    } catch {}
  }


 
 

  useEffect(() => {
    if (doctor?.id) {
      getScheduleByDoctor(doctor?.id, selectedDate);
    }

  }, [selectedDate]);

  return (
    <div class="content-wrapper">
      <div class="container-full">
        {/* <!-- Content Header (Page header) --> */}
        <div class="content-header">
          <div class="d-flex align-items-center">
            <div class="me-auto">
              <h2 class="page-title">SCHEDULE</h2>
              <div class="d-inline-block align-items-center">
                <nav>
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a>
                        <FontAwesomeIcon icon={faCircleUser} />
                      </a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      VIEW SCHEDULE DOCTOTOR 
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
                  </div>

                  {/* Các phần tử ở bên phải */}
                  <div className="schedule-filter-right">
                  
                  </div>
                </div>
                <div className="list-schedule-dc">
                  <div className="form-group">
                    <div className="time-selection">
                      {schedules.map((schedule) => (
                        <div
                          key={schedule?.id}
                          className="time-slot selected"
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

          
              </div>
            </div>
          </div>
        </section>
        {/* <!-- /.content --> */}
      </div>
    </div>
  );
};

export default DoctorSchedule;
