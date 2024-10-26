import React, { useEffect, useState } from 'react'
import { faCircleUser, faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import All_API from '../../../../state/All_API';
import { ToastError, ToastSuccess } from '../../../../notification';

const AddSchedule = () => {
    const styleButton = {
        fontSize: 'unset'
    }
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [clinicId, setClinicId] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [dateSchedule, setDateSchedule] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [durationMinutes, setDurationMinutes] = useState(0);
    const [price,setPrice] = useState(0);



    const handleSubmit = (event) => {
		event.preventDefault();
	
		const data = new FormData(event.currentTarget);
		const scheduleData = {
			doctor_id: data.get("doctor_id"),
            clinic_id: data.get("clinic_id"),
            start_time: data.get("start_time"),
            end_time: data.get("end_time"),
            date_schedule: data.get("dateSchedule"),
            price: price,
            booking_limit: data.get("booking_limit"),
		};
		createSchedule(scheduleData)
	  }

    

		async function createSchedule(productData) {
		  try{
			const response = await All_API.createSchedule(productData)
			if(response.data.status === "success") {
				ToastSuccess(response.data.message)
                navigate("/admin/schedules")
			}else {
				ToastError(response.data.message)
			}
		  }catch (error){
			ToastError(error.response.data.message)
		  }
		}


    const handleDoctorChange = (e) => {
        const doctorIdexs = parseInt(e.target.value); // Lấy doctorId từ sự kiện thay đổi
        setDoctorId(doctorIdexs); 
        const foundDoctor = doctors.find((doctor) => doctor.id === doctorIdexs);

        // Cập nhật thông tin bác sĩ được chọn
        fetchDurationMinutes(foundDoctor?.specialty?.id);  // Gọi API khi chọn start_time

        getDoctorById(doctorIdexs)
    };
    const handleEndTimeChange = (e) => setEndTime(e.target.value)
    const handleClinicChange = (e) => setClinicId(e.target.value);
    const handleDateChange = (e) => setDateSchedule(e.target.value);
  


    async function getAllDoctor() {
        try{
          const response = await All_API.getDoctorFull()
          setDoctors(response.data.data.doctors)
        }catch {
          
        }
      }

      async function getAllClinic() {
        try{
          const response = await All_API.getClinicFull()
          setClinics(response.data.data.clinicList)
        }catch {
          
        }
      }

      async function fetchDurationMinutes(specialtyId) {
        try{
          const response = await All_API.getSlotTime(specialtyId)
          setDurationMinutes(response.data.data[0].durationMinutes)
        }catch {
          
        }
      }

      async function getDoctorById(doctorId) {
        try{
          const response = await All_API.getDoctorById(doctorId)
          setPrice(response?.data?.data?.specialty?.price)
        }catch {
          
        }
      }

      const handleStartTimeChange = (e) => {
        const value = e.target.value;
        setStartTime(value);
      };

      useEffect(()=> {
        getAllDoctor()
        getAllClinic()

        if (startTime && durationMinutes !== 0 ) {
            const [hours, minutes] = startTime.split(':').map(Number);
    // Tính tổng số phút từ startTime và durationMinutes
      const totalMinutes = hours * 60 + minutes + durationMinutes;
      // Tính giờ và phút mới
      const newHours = Math.floor(totalMinutes / 60) % 24; // Giới hạn trong khoảng 24 giờ
      const newMinutes = totalMinutes % 60;
    
      // Định dạng giờ và phút để có 2 chữ số
      const formattedHours = newHours.toString().padStart(2, '0');
      const formattedMinutes = newMinutes.toString().padStart(2, '0');
      // Cập nhật endTime
      const newEndTime = `${formattedHours}:${formattedMinutes}`;
      setEndTime(newEndTime);
          }
          
      },[startTime])
  return (
    <div class="content-wrapper">
            <div class="container-full">
                <div class="content-header">
                    <div class="d-flex align-items-center">
                        <div class="me-auto">
                            <h2 class="page-title">Schedule</h2>
                            <div class="d-inline-block align-items-center">
                                <nav>
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a><FontAwesomeIcon icon={faCircleUser} /></a>
                                        </li>
                                        <li class="breadcrumb-item active" aria-current="page">Add Schedule</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <section class="content">
                    <div class="row">
                        <div class=" col-12">
                            <div class="box">
                            
                                {/* <!-- /.box-header --> */}
                                <form class="form" onSubmit={handleSubmit}>
                                    <div class="box-body">
                                        <h4 class="box-title text-info mb-0"><i class="ti-user me-15"></i> Schedule Info
                                        </h4>
                                        <div class="my-15">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Doctor</label>
                                                        <select
                                                         id="doctor_id"
                                                         value={doctorId}
                                                         onChange={handleDoctorChange}
                                                         className="schedule-filter-select select-admin-form"
                                                         name='doctor_id'
                                                         required
                                                       >
                                                         <option value="">Select Doctor</option>
                                                         {doctors?.map((doctor)=> (
                                                             <option value={doctor?.id}>{doctor?.user.fullname}</option>
                                                         ))}
                                                      
                                                       </select>
                                                   
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Clinic</label>
                                                        <select
                                                         id="clinic_id"
                                                         value={clinicId}
                                                         onChange={handleClinicChange}
                                                         className="schedule-filter-select select-admin-form"
                                                         name='clinic_id'
                                                         required

                                                       >
                                                         <option value="">Select Clinic</option>
                                                         {clinics?.map((clinic)=> (
                                                             <option value={clinic?.id}>{clinic?.clinicName}</option>
                                                         ))}
                                                      
                                                       </select>                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Date Schedule</label>
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
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Price</label>
                                                        <input type="number" value={price} onChange={(e)=> setPrice(e.target.value)} name='price' id='price' min={0} className='schedule-filter-input select-admin-form' required/>
                                                        </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                            <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Start Time</label>
                                                        <input type="time" value={startTime} onChange={handleStartTimeChange} name='start_time' className='schedule-filter-input select-admin-form' required/>
                                                        </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">End Time</label>
                                                        <input type="time" value={endTime} onChange={handleEndTimeChange}   name='end_time' id='end_time' className='schedule-filter-input select-admin-form' required/>
                                                            </div>
                                                </div>
                                               
                                            </div>

                                            <div class="row">
                                            
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Booking Limit</label>
                                                        <input type="number" min={0} name='booking_limit' id='booking_limit'  className='schedule-filter-input select-admin-form' required/>
                                                        </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Active</label>
                                                        <select
                                                         id="active"
                                                         className="schedule-filter-select select-admin-form"
                                                         name='active'
                                                         required
                                                         disabled
                                                       >
                                                             <option value="true">Active</option>
                                                             <option value="false">Block</option>
                                                       </select>
                                                   
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="my-15">
                                           
                                      
                                            {/* <!-- /.box-body --> */}
                                            <div class="box-footer">
                                                <button type="button" onClick={()=> navigate('/admin/schedules')} class="btn btn-warning me-10 ">
                                                    <i class="ti-trash"></i> Cancel
                                                </button>
                                                <button type="submit" class="btn btn-primary">
                                                    <i class="ti-save-alt"></i> Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form >
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
  )
}

export default AddSchedule
