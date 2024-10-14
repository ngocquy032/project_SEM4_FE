import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import All_API from "../../../../state/All_API";
import { ToastError, ToastSuccess } from "../../../../notification";
import Loading from "../Loading";
import { API_BASE_URL } from "../../../../config/apiConfig";
import ScheduleDoctorLayout from "../ScheduleDoctorLayout";
import ChangeScheduleLayout from "./ChangeScheduleLayout";
import { convertToDateString, convertToTimeString } from "../../../Admin/componets/ConvertData";

const FormChangeSchedule = ({ handleClose, open , booking, userId,  isLoad,}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "1120px",
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    padding: "16px",
    outline: "none",
  };


  const [waitRs, setWaitRs] = useState(false)
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null)




  async function getDoctorById(idObject) {
    try {
      const response = await All_API.getDoctorById(idObject);
      if (response.data.status === "success") {
        setDoctor(response.data.data);
        
      } else {
        // navigate("/404");
      }
    } catch (error) {
      //  navigate("/404");
    }
  }

  useEffect(() => {
 
    getDoctorById(booking?.schedule?.doctor_id);
  }, []);


  const handleCloseMd = () => {
    handleClose()
  }

  const isLoading = () => {
    isLoad()
  }



  return (
    <div>
       {waitRs && <Loading />}
      <Modal
        open={open ? open : false}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            id="deleteModal"
            tabIndex="-1"
            aria-hidden="true"
            className="custombk-modal-overlay"
          >
              <div className="col-lg-12">
                            <h3 className="mb-4">Change Appointment</h3>
                            <div className="divider my-4"></div>
                            <div className="row">
                            <div className="note-header-sc">
                            <p className="note-chage-sc"><strong>Note:</strong> You can only change the appointment **once**.</p>
                            <div className="box-hd-appoints">
                            <p className="b2-hd-txt"><strong>Current schedule:</strong></p>
                            <div className="b2-hd-appoints">
                          <div class="appoits-time">
                       <img className='appoits-icon-sc' src="/customer/images/clock.svg" alt="" />
                     <span>{convertToTimeString(booking?.schedule?.start_time)} - {" "}
                     {convertToTimeString(booking?.schedule?.end_time)}</span>
                 </div>
                 <div class="appoits-date">
                 <img className='appoits-icon-sc' src="/customer/images/calendar.svg" alt="" />
                 <span>{convertToDateString(booking?.schedule?.date_schedule)}</span>
                 </div>
                          </div>




                          
                       
                            </div>

                            </div>
                                    <div key={doctor?.id} className="col-md-12 mb-4">
                                        <div className="">
                                            <div className="card-body">
                                                <div className='row'>
                                                    <div className='col-md-6 card-doctor-cle '>
                                                        <div className='doctor-lcle'>
                                                            <img   src={`${API_BASE_URL}images/view/${doctor?.avatar}`}
                                                             alt="Doctor avatar" className='img-doctor-cle' />
                                                            <div className='btn-more-cle'>
                                                            <a onClick={()=>navigate(`/doctors/${doctor?.id}-${doctor?.user?.fullname}`)}>See more</a>
                                                            </div>
                                                        </div>
                                                        <div className='doctor-rcle'>
                                                        <h4 className="card-title doctor-fullname-cle">{doctor?.user?.fullname}</h4>
                                                            <p className="card-text doctor-exp-cle">Experience: {doctor?.experience} years</p>
                                                            <p className="card-text doctor-text-cle doctor-bio-cle">Qualification: {doctor?.qualification}</p>
                                                        </div>
                                               
                                                    </div>
                                                    <div className='col-md-6'>
                                                    <h5 className="card-subtitle mb-2 mt-2">Schedule:</h5>
                                                        <ChangeScheduleLayout idDoctor={doctor?.id} idSchedule={booking?.schedule?.id} 
                                                        handleClose={handleCloseMd} userId={userId}
                                                        bookingId={booking?.id}
                                                        isLoad={isLoading}/>
                                                    </div>
                                                </div>
                                               
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default FormChangeSchedule;
