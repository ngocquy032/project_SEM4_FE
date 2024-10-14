import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import All_API from "../../../../state/All_API";
import { convertToTimeString } from "../../../Admin/componets/ConvertData";
import { ToastError, ToastSuccess } from "../../../../notification";

const ChangeScheduleLayout = ({ idDoctor, idSchedule, handleClose, userId, bookingId, isLoad }) => {
    const buttonGroupStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginTop: '20px'
    };
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate()

  const handleChangSchedule = ()=> {
    changeScheduleByUser(userId,bookingId, selectedTime)

  }

  async function changeScheduleByUser(userId,bookingId, idSchedule) {
    try {
        const response = await All_API.changeScheduleByUser(userId,bookingId, idSchedule);

        if (response.data.status === "success") {
            ToastSuccess(response.data.message)
            isLoad()
            handleClose()
        } else {
            ToastError(response.data.message);
            handleClose()
        }
    } catch (error) {
        ToastError(error.response.data.message);
        handleClose()
    }
}


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
    if(idDoctor) {
        getScheduleByDoctor(idDoctor, selectedDate);
    }
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
    className={`time-slot ${selectedTime === schedule?.id ? "selected" : ""} ${schedule?.booking_limit === schedule?.number_booked || schedule?.id === idSchedule ? "disabled" : ""}`}
    onClick={() => {schedule?.booking_limit !== schedule?.number_booked && schedule?.id !== idSchedule  && handleTimeClick(schedule?.id)  }}
    style={{ pointerEvents: schedule?.booking_limit === schedule?.number_booked ? "none" : "auto" }}
  >
    {convertToTimeString(schedule?.start_time)} -{" "}
    {convertToTimeString(schedule?.end_time)}
  </div>
))}
          </div>
        </div>
      </form>
    

      

                                                <div className="box-footer btn-chage-sc" style={buttonGroupStyle}>
                                        <button type="button" onClick={()=> handleClose()} class="btn btn-warning me-10 ">
                                                    <i class="ti-trash"></i> Cancel
                                                </button>
                                                <button disabled={!selectedTime}
                                                 type="submit" class="btn btn-primary" onClick={()=>handleChangSchedule()}>
                                                    <i class="ti-save-alt"></i> Save Change
                                                </button>
                                        </div>
    </Fragment>
  );
};

export default ChangeScheduleLayout;
