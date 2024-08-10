
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import '../../../assets/customers/css/style.css'

const BookingForm = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");

    const availableTimes = [
        "09:00 - 10:00",
        "10:00 - 11:00",
        "11:00 - 12:00",
        "13:00 - 14:00",
        "14:00 - 15:00",
        "15:00 - 16:00",
        "16:00 - 17:00"
    ];

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const appointment = {
            date: moment(selectedDate).format('YYYY-MM-DD'),
            time: selectedTime
        };
        console.log("Appointment booked:", appointment);
        // Add code to send appointment to the server or handle it as needed
    };

    return (
        <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
                <label htmlFor="date">Select Date</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()}
                    className="form-control"
                    id="date"
                />
            </div>
            <div className="form-group">
                <label>Select Time</label>
                <div className="time-selection">
                    {availableTimes.map((time, index) => (
                        <div
                            key={index}
                            className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                            onClick={() => handleTimeClick(time)}
                        >
                            {time}
                        </div>
                    ))}
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Book Appointment</button>
        </form>
    );
};

export default BookingForm;