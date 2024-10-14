import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import All_API from "../../../../state/All_API";
import { ToastError } from "../../../../notification";

const PrescriptionAdmin = ({ handleClose, open , idBooking}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    padding: "16px",
    outline: "none",
  };

  const [history, setHistory] = useState()
  const navigate = useNavigate()


  async function getBookingById(bookingId) {
    try {
        const response = await All_API.getHistoryByAdmin(bookingId);
        if (response.data.status === "success") {
          setHistory(response.data.data)
        } else {
            ToastError(response.data.status);
            handleClose()
        }
    } catch (error) {
        ToastError(error.response.data.message);
        handleClose()
    }
}

useEffect(()=> {
  getBookingById(idBooking)
}, [])


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
            className="custom-modal-overlay"
          >
           <div class="medical2-card">
                      <div class="medical2-header">Medical Result</div>
                      <div class="medical2-diagnosis">
                        Diagnosis: <span>{history?.diagnosis}</span>
                      </div>
                      <div class="medical2-prescriptions">
                        <div>
                          <strong>Prescriptions</strong>
                        </div>
                        <table class="medical2-table">
                          <tr>
                            <th>Medicine</th>
                            <th>Unit</th>
                            <th>Usage</th>
                          </tr>
                          {history?.prescriptions.map((prescription)=> (
                            <tr>
                            <td>{prescription?.medicine}</td>
                            <td>{prescription?.unit}</td>
                            <td>{prescription?.desciptionUsage}</td>
                          </tr>
                          ))}
                        
                        </table>
                      </div>
                    </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PrescriptionAdmin;
