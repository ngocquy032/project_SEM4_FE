import React, { useEffect, useState } from 'react';
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import All_API from '../../../../state/All_API';
import { ToastError, ToastSuccess } from '../../../../notification';
import { convertDataToDateString, convertToTimeString } from '../../componets/ConvertData';

const UpdateSchedule = () => {
    const { idSchedule } = useParams();
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [clinicId, setClinicId] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [dateSchedule, setDateSchedule] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [durationMinutes, setDurationMinutes] = useState(0);
    const [bookingLimit, setBookingLimit] = useState(0)
    const [price, setPrice] = useState(0)
    const [active, setActive] = useState(0)

    useEffect(() => {
        getAllDoctor();
        getAllClinic();
        getScheduleById(idSchedule);
    }, [idSchedule]);

    useEffect(() => {
        if (startTime && durationMinutes !== 0) {
            const [hours, minutes] = startTime.split(':').map(Number);
            const totalMinutes = hours * 60 + minutes + durationMinutes;
            const newHours = Math.floor(totalMinutes / 60) % 24;
            const newMinutes = totalMinutes % 60;
            const formattedHours = newHours.toString().padStart(2, '0');
            const formattedMinutes = newMinutes.toString().padStart(2, '0');
            const newEndTime = `${formattedHours}:${formattedMinutes}`;
            setEndTime(newEndTime);
        }
    }, [startTime, durationMinutes]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const scheduleData = {
            doctor_id: data.get("doctor_id"),
            clinic_id: data.get("clinic_id"),
            start_time: data.get("start_time"),
            end_time: data.get("end_time"),
            date_schedule: data.get("dateSchedule"),
            price: data.get("price"),
            booking_limit: data.get("booking_limit"),
            active: data.get("active") ==="true",

        };
        updateSchedule(scheduleData);
    }
    async function updateSchedule(scheduleData) {
        try {
            const response = await All_API.updateSchedule(idSchedule, scheduleData);
            if (response.data.status === "success") {
                ToastSuccess(response.data.message);
                navigate("/admin/schedules");
            } else {
                ToastError(response.data.message);
            }
        } catch (error) {
            ToastError(error.response.data.message);
        }
    }

    async function getScheduleById(idSchedule) {
        try {
            const response = await All_API.getScheduleById(idSchedule);
            if (response.data.status === "success") {
                const scheduleData = response.data.data;
                setDoctorId(scheduleData.doctor_id);
                setClinicId(scheduleData.clinic_id);
                setDateSchedule(convertDataToDateString(scheduleData.date_schedule))
                setStartTime(convertToTimeString(scheduleData.start_time))
                setEndTime(convertToTimeString(scheduleData.end_time))
                setBookingLimit(scheduleData.booking_limit)
                setPrice(scheduleData.price)
                setActive(scheduleData.active)
                fetchDurationMinutes(scheduleData.specialty_id)
                
                
            } else {
                ToastError(response.data.status);
                navigate('/admin/schedules');
            }
        } catch (error) {
            ToastError(error.response.data.message);
            navigate('/admin/schedules');
        }
    }

    async function getAllDoctor() {
        try {
            const response = await All_API.getDoctorFull();
            setDoctors(response.data.data.doctors);
        } catch {
            // Handle error
        }
    }

    async function getAllClinic() {
        try {
            const response = await All_API.getClinicFull();
            setClinics(response.data.data.clinicList);
        } catch {
            // Handle error
        }
    }

    async function fetchDurationMinutes(specialtyId) {
        try {
            const response = await All_API.getSlotTime(specialtyId);
            setDurationMinutes(response.data.data[0].durationMinutes);
        } catch {
            // Handle error
        }
    }

    const handleDoctorChange = (e) => {
        const doctorId = parseInt(e.target.value);
        setDoctorId(doctorId);
        const foundDoctor = doctors.find((doctor) => doctor.id === doctorId);
        fetchDurationMinutes(foundDoctor?.specialty_id);
    };

    const handleEndTimeChange = (e) => setEndTime(e.target.value);
    const handleClinicChange = (e) => setClinicId(e.target.value);
    const handleDateChange = (e) => setDateSchedule(e.target.value);
    const handleStartTimeChange = (e) => setStartTime(e.target.value);

    return (
        <div className="content-wrapper">
            <div className="container-full">
                <div className="content-header">
                    <div className="d-flex align-items-center">
                        <div className="me-auto">
                            <h2 className="page-title">Schedule</h2>
                            <div className="d-inline-block align-items-center">
                                <nav>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a><FontAwesomeIcon icon={faCircleUser} /></a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Update Schedule</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="box">
                                <form className="form" onSubmit={handleSubmit}>
                                    <div className="box-body">
                                        <h4 className="box-title text-info mb-0"><i className="ti-user me-15"></i> Schedule Info</h4>
                                        <div className="my-15">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Doctor</label>
                                                        <select
                                                            id="doctor_id"
                                                            value={doctorId}
                                                            onChange={handleDoctorChange}
                                                            className="schedule-filter-select select-admin-form"
                                                            name='doctor_id'
                                                            required
                                                        >
                                                            <option value="">Select Doctor</option>
                                                            {doctors?.map((doctor) => (
                                                                <option key={doctor?.id} value={doctor?.id}>{doctor?.user.fullname}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Clinic</label>
                                                        <select
                                                            id="clinic_id"
                                                            value={clinicId}
                                                            onChange={handleClinicChange}
                                                            className="schedule-filter-select select-admin-form"
                                                            name='clinic_id'
                                                            required
                                                        >
                                                            <option value="">Select Clinic</option>
                                                            {clinics?.map((clinic) => (
                                                                <option key={clinic?.id} value={clinic?.id}>{clinic?.clinicName}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Date Schedule</label>
                                                        <input
                                                            type="date"
                                                            id="dateSchedule"
                                                            value={dateSchedule}
                                                            onChange={handleDateChange}
                                                            className="schedule-filter-input select-admin-form"
                                                            name='dateSchedule'
                                                            required
                                                            min={new Date().toISOString().split('T')[0]}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Price</label>
                                                        <input
                                                            type="number"
                                                            name='price'
                                                            id='price'
                                                            min={0}
                                                            value={price}
                                                            onChange={(e) => setPrice(Number(e.target.value))}  
                                                            className='schedule-filter-input select-admin-form'
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Start Time</label>
                                                        <input
                                                            type="time"
                                                            id="start_time"
                                                            value={startTime}
                                                            onChange={handleStartTimeChange}
                                                            className="schedule-filter-input select-admin-form"
                                                            name='start_time'
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">End Time</label>
                                                        <input
                                                            type="time"
                                                            id="end_time"
                                                            value={endTime}
                                                            onChange={handleEndTimeChange}
                                                            className="schedule-filter-input select-admin-form"
                                                            name='end_time'
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Booking Limit</label>
                                                        <input
                                                            type="number"
                                                            name='booking_limit'
                                                            id='booking_limit'
                                                            value={bookingLimit}
                                                            onChange={(e) => setBookingLimit(Number(e.target.value))}                                                            min={0}
                                                            className='schedule-filter-input select-admin-form'
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Active</label>
                                                        <select
                                                            id="active"
                                                            value={active}
                                                            onChange={(e) => setActive(e.target.value)}
                                                            className="schedule-filter-select select-admin-form"
                                                            name='active'
                                                            required
                                                        >
                                                            <option value="true">Active</option>
                                                            <option value="false">Block</option>

                                                        </select>
                                                      
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-footer">
                                    <button type="button" onClick={()=> navigate('/admin/schedules')} class="btn btn-warning me-10 ">
                                                    <i class="ti-trash"></i> Cancel
                                                </button>
                                                <button type="submit" class="btn btn-primary">
                                                    <i class="ti-save-alt"></i> Update
                                                </button>                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UpdateSchedule;
