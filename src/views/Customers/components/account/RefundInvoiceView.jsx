import { Box, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import All_API from '../../../../state/All_API';
import { ToastError } from '../../../../notification';

const RefundInvoiceView = ({ handleClose, open , bookingId}) => {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "440px",
        bgcolor: "background.paper",
        borderRadius: "8px",
        boxShadow: 24,
        padding: "16px",
        outline: "none",
      };
      const [invoice, setInvoice] = useState(null)

      async function getRsInvoice(bookingId) {
        try {
            const response = await All_API.getRsInvoice(bookingId);
            if (response.data.status === "success") {
                setInvoice(response.data.data)
            } else {
                ToastError(response.data.status);
                handleClose()
            }
        } catch (error) {
            ToastError(error.response.data.message);
            handleClose()
        }
    }
    
    useEffect(() => {
        getRsInvoice(bookingId)
    }, [bookingId]);
      
    
  return (
    <div>
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
        <div className="customRI-invoice-card">
        <button className="customRI-modal-close" onClick={()=> handleClose()}>
          &times;
        </button>
      <h2 className="customRI-invoice-title">Refund Invoice</h2>
      <div className="customRI-invoice-info">
        <div className="customRI-info-row">
          <span className="customRI-info-label">Invoice ID:</span>
          <span className="customRI-info-value">{invoice?.id}</span>
        </div>
        <div className="customRI-info-row">
          <span className="customRI-info-label">Booking ID:</span>
          <span className="customRI-info-value">{invoice?.booking_id}</span>
        </div>
        <div className="customRI-info-row">
          <span className="customRI-info-label">Refund amount:</span>
          <span className="customRI-info-value">
            ${invoice?.amount.toFixed(2)}
          </span>
        </div>
        <div className="customRI-info-row">
          <span className="customRI-info-label">Bank Name:</span>
          <span className="customRI-info-value">{invoice?.bank_name}</span>
        </div>
        <div className="customRI-info-row">
          <span className="customRI-info-label">Holder Name:</span>
          <span className="customRI-info-value">{invoice?.holder_name}</span>
        </div>
        <div className="customRI-info-row">
          <span className="customRI-info-label">Account Number:</span>
          <span className="customRI-info-value">{invoice?.account_number}</span>
        </div>
        <div className="customRI-info-row">
          <span className="customRI-info-label">Status:</span>
          <span className="customRI-info-value"><span className={
             invoice?.status === "Wait Refund"
             ? "badge badge-info"
             : invoice?.status === "Refunded"
               ? "badge badge-primary"
               :""
          }
          >{invoice?.status}</span></span>
        </div>
      </div>
    </div>
      
       </div>
     </Box>
   </Modal>
 </div>
  )
}

export default RefundInvoiceView