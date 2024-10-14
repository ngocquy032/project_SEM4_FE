import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { ToastError, ToastSuccess } from "../../../../notification";
import { useNavigate, useParams } from "react-router-dom";
import All_API from "../../../../state/All_API";
import { ConvertDateTime } from "../../componets/ConvertData";

const ContactView = ({ handleClose, open, idObject }) => {
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
  const buttonGroupStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "20px",
  };
  const navigate = useNavigate();
  const [contact, setContact] = useState();

  async function getContactById() {
    try {
      const response = await All_API.getContactById(idObject);
      setContact(response.data.data);
    } catch {
      ToastError("please try again");
      handleClose();
    }
  }

  useEffect(() => {
    getContactById();
  }, []);

  return (
    <Modal
      open={open ? open : false}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="row">
          <div className="">
            <div className="ec-cat-list  card-default mb-24px">
              <div className="card-body">
                <div className="ec-cat-form">
                  <h4>View Contact</h4>

                  <form className="row">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="text" className="form-label">
                        {" "}
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        className="form-control here slug-title"
                        type="text"
                        value={contact?.name}
                        disabled
                      />
                    </div>

                    <div className="form-group col-md-6 ">
                      <label htmlFor="text" className="form-label">
                        {" "}
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        className="form-control here slug-title"
                        type="text"
                        value={contact?.email}
                        disabled
                      />
                    </div>

                    <div className="form-group col-md-12 ">
                      <label htmlFor="text" className="form-label">
                        {" "}
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-control here slug-title"
                        type="text"
                        value={contact?.message}
                        disabled
                      />
                    </div>

                    <div className="form-group col-md-12 ">
                      <label htmlFor="text" className="col-form-label">
                        {" "}
                        Reply
                      </label>
                      <textarea
                        id="reply"
                        name="reply"
                        className="form-control here slug-title"
                        type="text"
                        description="Reply to messages"
                        disabled
                        value={contact?.reply}
                      />
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="text" className="col-form-label">
                        Created At
                      </label>
                      <input
                        id="createdAt"
                        name="createdAt"
                        className="form-control here slug-title"
                        type="text"
                        value={ConvertDateTime(contact?.createdAt)}
                        disabled
                      />
                    </div>
                    <div className="form-group col-md-6 ">
                      <label htmlFor="text" className="col-form-label">
                        Updated At
                      </label>
                      <input
                        id="updatedAt"
                        name="updatedAt"
                        className="form-control here slug-title"
                        type="text"
                        value={ConvertDateTime(contact?.updatedAt)}
                        disabled
                      />
                    </div>

                   <div className="col-md-12">
                   <div className=" box-btn-cancel " style={buttonGroupStyle}>
                      <button type="button" className="btn btn-warning" onClick={()=> handleClose()}>
                        <i className="ti-trash"></i> Cancel
                      </button>
                    </div>
                   </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ContactView;
