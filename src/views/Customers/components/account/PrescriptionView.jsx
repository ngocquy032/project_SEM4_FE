import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Modal } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const PrescriptionView = ({ handleClose, open , idBooking}) => {
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
                        Diagnosis: <span>Hypertension</span>
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
                          <tr>
                            <td>Amoxicillin</td>
                            <td>10.0</td>
                            <td>500mg daily for 7 days</td>
                          </tr>
                          <tr>
                            <td>Cough Syrup</td>
                            <td>5.0</td>
                            <td>10ml every 8 hours</td>
                          </tr>
                        </table>
                      </div>
                    </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PrescriptionView;
