import React, { useEffect, useState } from 'react';
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import All_API from '../../../../state/All_API';
import { ToastError, ToastSuccess } from '../../../../notification';
import { convertToDateString, convertToTimeString } from '../../componets/ConvertData';
import PrescriptionAdmin from './PrescriptionAdmin';
import RefundInvoiceAdmin from './RefundInvoiceAdmin';

const ViewBooking = () => {
    const { idBooking } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
 
    const [openViewModal, setOpenViewModal] = useState(false);
    const [refundModal, setRefundModal] = useState(false);
    const [loading, setLoading] = useState(false);

  
  
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

    const handleLoading = () => {
        setLoading(!loading);
      };

  
    async function getBookingById(idBooking) {
        try {
            const response = await All_API.getBookingByIdAdmin(idBooking);
            if (response.data.status === "success") {
                setBooking(response.data.data)
            } else {
                ToastError(response.data.status);
                navigate('/admin/bookings');
            }
        } catch (error) {
            ToastError(error.response.data.message);
            navigate('/admin/bookings');
        }
    }

   
    useEffect(() => {
        getBookingById(idBooking)
    }, [loading]);

    
 

    return (
        <div className="content-wrapper">
            <div className="container-full">
                <div className="content-header">
                    <div className="d-flex align-items-center">
                        <div className="me-auto">
                            <h2 className="page-title">Booking</h2>
                            <div className="d-inline-block align-items-center">
                                <nav>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a><FontAwesomeIcon icon={faCircleUser} /></a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">View Booking</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="row justify-content-center">
                        <div className="col-8">
                            <div className="box">
                                <form className="form" >
                                    <div className="box-body">
                                        <h4 className="box-title text-info mb-0"><i className="ti-user me-15"></i> Booking Info</h4>
                                        <div className="my-15">
                                        <div class="row">
                                            <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">ID Booking</label>
                                                        <input type="text" class="form-control"
                                                            value={booking?.id}
                                                            name='id' 
                                                            disabled
                                                            />
                                                    </div>
                                                </div>
                                            <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Full Name</label>
                                                        <input type="text" class="form-control"
                                                           value={booking?.user.fullname}
                                                           name='fullName' 
                                                           disabled />
                                                    </div>
                                            </div>
                                            <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Birthday</label>
                                                        <input type="text" class="form-control"
                                                           value={booking?.user.birthday}
                                                           name='birthday' 
                                                           disabled />
                                                    </div>
                                            </div>
                                            
                                        </div>    
                                        <div class="row">
                                        <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Gender</label>
                                                        <input type="text" class="form-control"
                                                           value={booking?.user.gender}
                                                           name='gender' 
                                                           disabled />
                                                    </div>
                                            </div>
                                            <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Email</label>
                                                        <input type="text" class="form-control"
                                                            value={booking?.user.email}
                                                            name='email' 
                                                            disabled
                                                            />
                                                    </div>
                                                </div>
                                            <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Phone</label>
                                                        <input type="text" class="form-control"
                                                           value={booking?.user.phone_number}
                                                           name='phone_number' 
                                                           disabled />
                                                    </div>
                                            </div>
                                          
                                          
                                        </div> 
                                        <div class="row">
                                        <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="form-label">Address</label>
                                                        <input type="text" class="form-control"
                                                           value={booking?.user.address}
                                                           name='birthday' 
                                                           disabled />
                                                    </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                        <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Doctor Name</label>
                                                        <input type="text" class="form-control"
                                                           value={booking?.schedule.doctor_name}
                                                           name='doctor_name' 
                                                           disabled />
                                                    </div>
                                            </div>
                                            <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Specialty Name</label>
                                                        <input type="text" class="form-control"
                                                            value={booking?.schedule.specialty_name}
                                                            name='specialty_name' 
                                                            disabled
                                                            />
                                                    </div>
                                                </div>
                                            <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Clinic Name</label>
                                                        <input type="text" class="form-control"
                                                           value={booking?.schedule.clinic_name}
                                                           name='phone_number' 
                                                           disabled />
                                                    </div>
                                            </div>
                                          
                                          
                                        </div> 
                                        <div class="row">
                                        <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Date Schedule</label>
                                                        <input type="text" class="form-control"
                                                           value={convertToDateString(booking?.schedule?.date_schedule)}
                                                           name='date_schedule' 
                                                           disabled />
                                                    </div>
                                            </div>
                                            <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Start Time</label>
                                                        <input type="text" class="form-control"
                                                            value={convertToTimeString(booking?.schedule?.start_time)}
                                                            name='start_time' 
                                                            disabled
                                                            />
                                                    </div>
                                                </div>
                                            <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">End Time</label>
                                                        <input type="text" class="form-control"
                                                            value={convertToTimeString(booking?.schedule?.end_time)}
                                                            name='end_time' 
                                                           disabled />
                                                    </div>
                                            </div>
                                          
                                          
                                        </div> 
                                        <div class="row">
                                        <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Amount</label>
                                                        <input type="text" class="form-control"
                                                           value={booking?.amount}
                                                           name='amount' 
                                                           disabled />
                                                    </div>
                                            </div>
                                            <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Created At</label>
                                                        <input type="text" class="form-control"
                                                            value={booking?.created_at}
                                                            name='created_at' 
                                                            disabled
                                                            />
                                                    </div>
                                                </div>
                                            <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Updated At</label>
                                                        <input type="text" class="form-control"
                                                            value={booking?.updated_at}
                                                            name='end_time' 
                                                           disabled />
                                                    </div>
                                            </div>
                                          
                                          
                                        </div> 
                                        <div class="row">
                                        <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Payment Method</label>
                                                        <input type="text" class="form-control"
                                                           value={booking?.payment_method}
                                                           name='payment_method' 
                                                           disabled />
                                                    </div>
                                            </div>
                                            <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Payment Code</label>
                                                        <input type="text" class="form-control"
                                                            value={booking?.payment_code}
                                                            name='payment_code' 
                                                            disabled
                                                            />
                                                    </div>
                                                </div>
                                            <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Status</label>
                                                        <input type="text" class="form-control"
                                                            value={booking?.status.toUpperCase()}
                                                            name='status' 
                                                           disabled />
                                                    </div>
                                            </div>

                                            <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="form-label">Reason</label>
                                                        <textarea type="text" class="form-control"
                                                            value={booking?.reason}
                                                            name='reason' 
                                                           disabled />
                                                    </div>
                                            </div>
                                          
                                          
                                        </div> 

                                        </div>
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
                                    <div className="box-footer">
                                    <button type="button" onClick={()=> navigate('/admin/bookings')} class="btn btn-warning me-10 ">
                                                    <i class="ti-trash"></i> Cancel
                                                </button>
                                                                           </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {openViewModal && (
        <PrescriptionAdmin
          open={openViewModal}
          handleClose={handleViewClose}
          idBooking={idBooking}
        />
      )}

      {refundModal && (
        <RefundInvoiceAdmin
          open={refundModal}
          handleClose={handleRefundModalClose}
          bookingId={idBooking}
        />
      )}
        </div>
    );
};

export default ViewBooking;
