import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import All_API from "../../../../state/All_API";
import { ToastError, ToastSuccess } from "../../../../notification";
import Loading from "../Loading";

const FormBankModal = ({ handleClose, open , booking, userId,  isLoad}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "460px",
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    padding: "16px",
    outline: "none",
  };

  const navigate = useNavigate()

   const [bankName, setBankName] = useState('');
  const [holderName, setHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [waitRs, setWaitRs] = useState(false)

  const handleBankNameChange = (e) => {
    setBankName(e.target.value);
  };

  const handleHolderNameChange = (e) => {
    setHolderName(e.target.value);
  };

  const handleAccountNumberChange = (e) => {
    const formattedNumber = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    setAccountNumber(formattedNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataBank = {
        booking_id: booking?.id,
        bank_name: bankName,
        holder_name: holderName,
        account_number: accountNumber
    }
    requestRefund(userId, booking?.id, dataBank)
  };


  async function requestRefund(userId,bookingId, DataBank) {
  setWaitRs(true)
    try {
        const response = await All_API.RefundBookingUser(userId,bookingId, DataBank);

        if (response.data.status === "success") {
            ToastSuccess(response.data.message)
            handleClose()
            isLoad()
        } else {
            ToastError(response.data.status);
            handleClose()
        }
    } catch (error) {
        ToastError(error.response.data.message);
        handleClose()
    }
    setWaitRs(false)
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
           <div className="custombk-card-container">
      <h2>Bank Card Details</h2>

      {/* Card Preview */}
      <div className="custombk-card-preview">
        <div className="custombk-bank-name">{bankName || 'Bank Name'}</div>
        <div className="custombk-account-number">{accountNumber || '•••• •••• •••• ••••'}</div>
        <div className="custombk-holder-name">{holderName || 'Card Holder Name'}</div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="custombk-form-group">
          <label htmlFor="bankName">Bank Name</label>
          <select id="bankName" value={bankName} onChange={handleBankNameChange} required>
            <option value="" disabled>Select your bank</option>
            <option value="Vietcombank">Vietcombank</option>
            <option value="Vietinbank">Vietinbank</option>
            <option value="BIDV">BIDV</option>
            <option value="Agribank">Agribank</option>
            <option value="Techcombank">Techcombank</option>
            <option value="ACB">ACB (Asia Commercial Bank)</option>
            <option value="Sacombank">Sacombank</option>
            <option value="VPBank">VPBank</option>
            <option value="MB">Military Bank (MB)</option>
            <option value="TPBank">TPBank</option>
            <option value="SHB">SHB (Saigon-Hanoi Bank)</option>
            <option value="Eximbank">Eximbank</option>
          </select>
        </div>

        <div className="custombk-form-group">
          <label htmlFor="holderName">Card Holder's Full Name</label>
          <input
            type="text"
            id="holderName"
            value={holderName}
            onChange={handleHolderNameChange}
            placeholder="Enter full name"
            required
          />
        </div>

        <div className="custombk-form-group">
          <label htmlFor="accountNumber">Account Number</label>
          <input
            type="text"
            id="accountNumber"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            maxLength="19"
            placeholder="Enter account number"
            required
          />
        </div>

        <button type="submit" className="custombk-btn-submit">Request Refund</button>
      </form>
    </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default FormBankModal;
