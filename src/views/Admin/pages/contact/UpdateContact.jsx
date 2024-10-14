import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { ToastError, ToastSuccess } from "../../../../notification";
import { useNavigate, useParams } from "react-router-dom";
import All_API from "../../../../state/All_API";
import { ConvertDateTime } from "../../componets/ConvertData";
import Loading from "../../../Customers/components/Loading";

const UpdateContact = ({ handleClose, open, idObject , onUpdate}) => {
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

  const [contact, setContact] = useState();
  const [reply, setReply] = useState(contact?.reply || "");
  const [awaitRs, setAwaitRs] = useState(false)

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

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const contactData = {
      name: contact.name,
      email: contact.email,
      message: contact.message,
      reply: data.get("reply"),
      status: "Replied",
    };
    updateContact(idObject, contactData);
  };

  async function updateContact(id, contactData) {
    setAwaitRs(true)
    try {
      const response = await All_API.updateContact(id, contactData);
      if (response.data.status === "success") {
        ToastSuccess(response.data.message);
        onUpdate();
        handleClose();
      } else {
        ToastError(response.data.message);
        handleClose();
      }
    } catch {
      ToastError("Please try again");
    }
    setAwaitRs(false)
  }

  return (
    <Modal
      open={open ? open : false}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      {awaitRs && <Loading />}

      <div className="row">
      <div className="">
        <div className="ec-cat-list  card-default mb-24px">
          <div className="card-body">
            <div className="ec-cat-form">
              <h4>Edit Contact</h4>

              <form className="row" onSubmit={handleUpdate}>
                <div className="form-group col-6 ">
                  <label htmlFor="text" className="col-form-label">
                    ID Contact
                  </label>
                  <input
                    id="id"
                    name="category_id"
                    className="form-control here slug-title"
                    type="text"
                    disabled
                    value={idObject}
                  />
                </div>

                <div className="form-group col-6 ">
                  <label htmlFor="text" className="col-form-label">
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

                <div className="form-group col-12 ">
                  <label htmlFor="text" className="col-form-label">
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

                <div className="form-group col-12 ">
                  <label htmlFor="text" className="col-form-label">
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

                <div className="form-group col-12 ">
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
                    disabled={contact?.status === "Replied"} 
                    value={
                      contact?.status === "Replied" ? contact.reply : reply
                    } 
                    onChange={(e) => setReply(e.target.value)} 
                  />
                </div>

                <div className="col-md-12">
                   <div className=" box-btn-cancel " style={buttonGroupStyle}>
                      <button type="button" className="btn btn-warning" onClick={()=> handleClose()}>
                        <i className="ti-trash"></i> Cancel
                      </button>
                      {contact?.status === "AwaitReply" && 
                    <button
                      name="submit"
                      type="submit"
                      className="btn btn-primary btn-admin"
                    >
                      Update
                    </button>}
                    </div>
                   </div>

                <div className="row">
                <div className="col-12">
                   
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

export default UpdateContact;
