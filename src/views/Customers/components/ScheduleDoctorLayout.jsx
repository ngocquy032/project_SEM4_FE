import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import All_API from "../../../state/All_API";
import { convertToTimeString } from "../../Admin/componets/ConvertData";
import { useNavigate } from "react-router-dom";

const ScheduleDoctorLayout = ({ idDoctor }) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate()

  const handleDateChange = (date) => {
    const formattedDate = date ? date.toISOString().split("T")[0] : null;
    setSelectedDate(formattedDate);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  async function getScheduleByDoctor(idDoctor, dateSchedule) {
    try {
      const response = await All_API.getScheduleByDoctor(
        idDoctor,
        dateSchedule
      );
      setSchedules(response.data.data);
    } catch {}
  }

  useEffect(() => {
    getScheduleByDoctor(idDoctor, selectedDate);
  }, [idDoctor, selectedDate]);

  return (
    <Fragment>
      <form className="booking-form">
        <div className="form-group date-schedule-cle">
          <p className="title-address">Date:</p>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            className="custom-datepicker"
            id="date"
          />
        </div>
        <div className="form-group ">
          {schedules.length > 0 && (
            <label className="title-address">Select Time</label>
          )}
          <div className="time-selection">
          {schedules.map((schedule) => (
  <div
    key={schedule?.id}
    className={`time-slot ${selectedTime === schedule?.id ? "selected" : ""} ${schedule?.booking_limit === schedule?.number_booked ? "disabled" : ""}`}
    onClick={() => {schedule?.booking_limit !== schedule?.number_booked && handleTimeClick(schedule?.id)  
                navigate(`/booking/${schedule?.id}`)
    }}
    style={{ pointerEvents: schedule?.booking_limit === schedule?.number_booked ? "none" : "auto" }}
  >
    {convertToTimeString(schedule?.start_time)} -{" "}
    {convertToTimeString(schedule?.end_time)}
  </div>
))}
          </div>
        </div>
      </form>
      <div className="">
        {schedules.length > 0 && (
          <div>
            <p className="title-address">Address: </p>
            <p className="name-address">{schedules[0]?.clinic_name}</p>
            <p className="address-details">{schedules[0]?.clinic_address}</p>
          </div>
        )}
        {schedules.length > 0 && (
          <div className="flex-price-cle">
            <p className="title-address">Costs: </p>
            <p className="address-details ml-2"> ${schedules[0]?.price}</p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ScheduleDoctorLayout;
