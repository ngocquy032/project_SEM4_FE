import React, { useEffect, useState } from 'react'
import { faCircleUser, faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import All_API from '../../../../state/All_API';
import { ToastError, ToastSuccess } from '../../../../notification';

const UpdateTimeSlot = () => {
    const { idTimeSlot } = useParams();

    const styleButton = {
        fontSize: 'unset'
    }
    const navigate = useNavigate();
    const [specialties, setSpecialties] = useState([]);
    const [specialtyId, setSpecialtyId] = useState('');
    const [timeSlot, setTimeSlot] = useState(null);
    const [duration, setDuration] = useState(0)


    const handleSubmit = (event) => {
		event.preventDefault();
	
		const data = new FormData(event.currentTarget);
		const timeSlotData = {
			duration_minutes: data.get("duration_minutes")
		};
		updateTimeSlot(idTimeSlot, timeSlotData)
	  }


		async function updateTimeSlot(idTimeSlot, timeSlotData) {
		  try{
			const response = await All_API.updateTimeSlot(idTimeSlot, timeSlotData)
			if(response.data.status === "success") {
				ToastSuccess(response.data.message)
                navigate("/admin/timeSlots")
			}else {
				ToastError(response.data.message)
			}
		  }catch (error){
			ToastError(error.response.data.message)
		  }
		}

        const handleSpecialtyChange = (e) => setSpecialtyId(e.target.value);

        
        async function getAllSpecialty() {
            try{
              const response = await All_API.getSpecialtyFull()
              setSpecialties(response.data.data.specialtyList)
            }catch {
              
            }
          }

          async function gettimeSlotById(timeSlotId) {
            try {
                const response = await All_API.gettimeSlotById(timeSlotId);
                if (response.data.status === "success") {
                    const dataNew =response.data.data
                    setTimeSlot(dataNew);
                    setSpecialtyId(dataNew?.specialty.id)
                    setDuration(dataNew?.durationMinutes)
                } else {
                    ToastError(response.data.status);
                    navigate('/admin/timeSlots');
                }
            } catch (error) {
                ToastError(error.response.data.message);
                navigate('/admin/timeSlots');
            }
        }

      useEffect(()=> {
        getAllSpecialty()
        gettimeSlotById(idTimeSlot)
      },[])
  return (
    <div class="content-wrapper">
            <div class="container-full">
                <div class="content-header">
                    <div class="d-flex align-items-center">
                        <div class="me-auto">
                            <h2 class="page-title">Time Slot</h2>
                            <div class="d-inline-block align-items-center">
                                <nav>
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a><FontAwesomeIcon icon={faCircleUser} /></a>
                                        </li>
                                        <li class="breadcrumb-item active" aria-current="page">Update Time Slot</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <section class="content">
                    <div class="row justify-content-center">
                        <div class=" col-6 ">
                            <div class="box">
                            
                                {/* <!-- /.box-header --> */}
                                <form class="form" onSubmit={handleSubmit}>
                                    <div class="box-body">
                                        <h4 class="box-title text-info mb-0"><i class="ti-user me-15"></i> Time Slot Info
                                        </h4>
                                        <div class="my-15">

                                        <div class="row">
                                            
                                            <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="form-label">Time Slot ID</label>
                                                        <input type="number" disabled value={timeSlot?.id} name='id' id='id'  className='schedule-filter-input select-admin-form' required/>
                                                        </div>
                                                </div>
                                              
                                            </div>

                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="form-label">Specialty</label>
                                                        <select
                                                         id="specialty_id"
                                                         value={specialtyId}
                                                         onChange={handleSpecialtyChange}
                                                         className="schedule-filter-select select-admin-form"
                                                         name='specialty_id'
                                                         required
                                                         disabled
                                                       >
                                                         <option value="">Select Specialty</option>
                                                         {specialties?.map((specialty)=> (
                                                             <option value={specialty?.id}>{specialty?.specialtyName}</option>
                                                         ))}
                                                      
                                                       </select>
                                                   
                                                    </div>
                                                </div>
                                             
                                            </div>
                                         

                                            <div class="row">
                                            
                                            <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="form-label">Duration Minutes</label>
                                                        <input value={duration} onChange={(e)=> setDuration(Number(e.target.value))}
                                                        type="number" min={1} name='duration_minutes' id='duration_minutes'  className='schedule-filter-input select-admin-form' required/>
                                                        </div>
                                                </div>
                                              
                                            </div>
                                        </div>

                                        <div class="my-15">
                                           
                                      
                                            {/* <!-- /.box-body --> */}
                                            <div class="box-footer">
                                                <button type="button" onClick={()=> navigate('/admin/timeSlots')} class="btn btn-warning me-10 ">
                                                    <i class="ti-trash"></i> Cancel
                                                </button>
                                                <button type="submit" class="btn btn-primary">
                                                    <i class="ti-save-alt"></i> Update
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

export default UpdateTimeSlot
