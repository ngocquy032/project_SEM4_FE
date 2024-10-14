import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import All_API from '../../../../state/All_API';
import { ToastError } from '../../../../notification';
import { useSelector } from 'react-redux';
import { GetUser } from '../../../../state/Auth/authUserSlice';
import { convertToDateString, convertToTimeString } from '../../../Admin/componets/ConvertData';
import PrescriptionView from './PrescriptionView';
import RefundInvoiceView from './RefundInvoiceView';


const BookingDetails = () => {
  const [booking, setBooking] = useState(null)
  const navigate = useNavigate()
  const {idBooking} = useParams()
  const user = useSelector(GetUser)
  const [openViewModal, setOpenViewModal] = useState(false);
  const [refundModal, setRefundModal] = useState(false);


  const handleViewOpen = () => {
    setOpenViewModal(true);
  };

  const handleViewClose = () => {
    setOpenViewModal(false);
  };

  const handleRefundModalOpen = () => {
    setRefundModal(true);
  };

  const handleRefundModalClose = () => {
    setRefundModal(false);
  };
  
  async function getBookingById(userId,bookingId) {
    try {
        const response = await All_API.getBookingDetailUser(userId,bookingId);
        if (response.data.status === "success") {
            setBooking(response.data.data)
        } else {
            ToastError(response.data.status);
            navigate('/account');
        }
    } catch (error) {
        ToastError(error.response.data.message);
        navigate('/account');
    }
}

useEffect(() => {
    if(user) {
      getBookingById(user.id,idBooking)
    }
}, [user]);
  return (
      <div class="content-wrapper" style={{ margin: "5% 15% 0 15%" }}>
        <div class="container-full">
          <div className="appoits-content ">
           <div class="appoits-card card appoits-ct-mx">
           <div className="row ">
           <div class="appoits-card-header col-lg-3">
                 <img src="https://storage.googleapis.com/a1aa/image/dUwTsAFeZFwaV6ne1fMiovWfwMkSsu2hskTzCLzAUHKnNVMOB.jpg" alt="Doctor icon"/>
                 <div className='title-app-sc'>Medical Exam
                 </div>
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
             <div class="appoits-card-body col-lg-9">
                 <p><strong>Patient: {" "}</strong><strong>{booking?.user.fullname}</strong></p>
                 <p><strong>Email: {" "}</strong>{booking?.user.email}</p>
                 <p><strong>Phone: {" "}</strong> {booking?.user.phone_number}</p>

                 <p><strong>Doctor: {" "}</strong> 
                 <a href={`/doctors/${booking?.schedule.doctor_id}-${booking?.schedule.doctor_name}`}>
                 {booking?.schedule.doctor_name}</a></p>
                 <p><strong>Specialty: {" "}</strong>{booking?.schedule.specialty_name} </p>
                 <p><strong>Costs: {" "}</strong>${booking?.amount} </p>
                 <p><strong>Clinic: {" "}</strong>{booking?.schedule.clinic_name} </p>
                 <p><strong>Clinic Address: {" "}</strong>{booking?.schedule.clinic_address} </p>
                 <p><strong>Reason: {" "}</strong>{booking?.reason} </p>
                 {booking?.status === "paid" ? ( <div class="appoits-button">
                     <button>Appointment booked</button>
                 </div>) : booking?.status === "pending" ? (
                  <div class="appoits-button appoits-pending">
                     <button>Pending</button>
                 </div>
                 ) : booking?.status === "rejected" ? (
                  <div class="appoits-button appoits-rejected">
                  <button>Rejected</button>
              </div>
                 ): booking?.status === "Wait Refund" ? 
                  (
                  <div class="appoits-button appoits-waitrefund">
                     <button>Wait Refund</button>
                 </div>  ) : (
                  <div class="appoits-button appoits-refunded">
                     <button>Refunded</button>
                 </div>
                 )}
             </div>
             
           </div>
           
                
          <div>
               
       
          </div>
                 <div className='appoits-ft-cd'>
                 {(booking?.status === "paid") && (
              <div class="appoits-card-footer">
              <div>Medical Exam Results</div>
              <a className="view-history" onClick={()=>handleViewOpen()} >View</a>
          </div>
             )}

              
            {(booking?.status === "Wait Refund") && (
              <div class="appoits-card-footer">
              <div>Refund Information</div>
              <a className="view-history" onClick={()=>handleRefundModalOpen()} >View</a>
          </div>
             )}
                 {(booking?.status === "Refunded") && (
              <div class="appoits-card-footer">
              <div>Refund Information</div>
              <a className="view-history" onClick={()=>handleRefundModalOpen()} >View</a>
          </div>
             )}
                 </div>
         </div>
         
         </div>
        </div>
        {openViewModal && (
        <PrescriptionView
          open={openViewModal}
          handleClose={handleViewClose}
          idBooking={idBooking}
        />
      )}

      {refundModal && (
        <RefundInvoiceView
          open={refundModal}
          handleClose={handleRefundModalClose}
          bookingId={idBooking}
        />
      )}

      </div>
  );
}

export default BookingDetails
