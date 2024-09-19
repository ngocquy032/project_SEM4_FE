import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faCircleUser, faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import All_API from '../../../../state/All_API';
import { convertToDateString, convertToTimeString } from '../../componets/ConvertData';
import { Pagination, Stack } from '@mui/material';
import DeleteLayout from '../../componets/DeleteLayout';
import { ToastError, ToastSuccess } from '../../../../notification';


const TimeSlotList = () => {
    const displayStyle = {
        padding: '.25rem 0.5rem'
    }
   
    const navigate = useNavigate();
    const [slotTimes, setSlotTimes] = useState([])
    const [idObject, setIdObject] = useState('');
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

  async function getAllTimeSlot() {
    try{
      const response = await All_API.getAllTimeSlot()
      setSlotTimes(response.data.data)
    }catch {
      
    }
  }

  useEffect(()=> {
    getAllTimeSlot()
  }, [])

  return (
    <div class="content-wrapper">
    <div class="container-full">
        {/* <!-- Content Header (Page header) --> */}
        <div class="content-header">
            <div class="d-flex align-items-center">
                <div class="me-auto">
                    <h2 class="page-title">Time Slot</h2>
                    <div class="d-inline-block align-items-center">
                        <nav>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a><FontAwesomeIcon icon={faCircleUser} /></a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Time Slot List</li>
                            </ol>
                        </nav>
                    </div>
                </div>

            </div>
        </div>

        {/* <!-- Main content --> */}
        <section class="content">
            <div class="row"  >
                <div class="col-12">
                    <div class="box">
            
                        <div class="box-body">
                            <div class="table-responsive rounded card-table">
                                <table class="table border-no" id="example1">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Specialty Name</th>
                                            <th>Duration Minutes</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {slotTimes?.map((slotTime)=>(
                                              <tr class="hover-primary">
                                              <td>#{slotTime?.id}</td>
                                              <td>{slotTime?.specialty.specialtyName}</td>
                                              <td>{slotTime?.durationMinutes} minutes</td>
                                              <td>
                                                  <div class="btn-group acion-admin-list" >
                                                      <a style={displayStyle}  onClick={() => navigate(`/admin/timeSlots/${slotTime?.id}`)}>  <FontAwesomeIcon icon={faEye} className='icon-actionAD' /></a>
                                                      <a style={displayStyle}  onClick={() => navigate(`/admin/timeSlots/update/${slotTime?.id}`)}> <FontAwesomeIcon icon={faPen}  className='icon-actionAD'/></a>
                                                      <a style={displayStyle}  
                                                       ><FontAwesomeIcon icon={faTrash} /></a>
                                                  </div>
                                              </td> 
                                          </tr>
                                        ))}
                                      

                                    </tbody>
                                </table>
                            </div>
                            <div>
                </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
        {/* <!-- /.content --> */}
    </div>

</div>

  )
}

export default TimeSlotList
