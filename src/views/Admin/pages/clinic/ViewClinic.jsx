import React, { useState, useRef, useEffect } from "react";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import All_API from "../../../../state/All_API";
import { ToastError, ToastSuccess } from "../../../../notification";
import { API_BASE_URL } from "../../../../config/apiConfig";

const ViewClinic = () => {
  // const jwtAdmin = localStorage.getItem("jwtAdmin")
  const jwtAdmin =
    "eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjAxMjM0NTY3OCIsInVzZXJJZCI6Miwic3ViIjoiMDEyMzQ1Njc4IiwiZXhwIjoxNzI5MjU1NTE3fQ.wZaGXU0EQ9cmzaMiSAeLNDzCU9-9ZwuTB-Jd2N7osDg";

  // General styles for form layout consistency
  const inputStyle = {
    fontSize: "16px",
    padding: "10px",
    width: "100%",
    textAlign: "center", // Center text in the input
    display: "flex", // Flexbox for centering content
    alignItems: "center",
    justifyContent: "center",
  };

  const labelStyle = {
    fontWeight: "bold",
    marginBottom: "8px",
    display: "block",
  };

  const buttonGroupStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "20px",
  };

  const { idClinic } = useParams();

  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null); // State to store image preview
  const fileInputRef = useRef(null); // Ref to handle file input
  const [clinicName, setClinicName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [clinicImageOld, setClinicImageOld] = useState(null);


  const handleRemoveImage = () => {
    setImagePreview(null);
    fileInputRef.current.value = null; // Reset file input
  };

 

 



  async function getClinicById(idObject) {
    try {
      const response = await All_API.getClinicById(idObject);
      if (response.data.status === "success") {
        const dataNew = response.data.data;
        setClinicName(dataNew?.clinicName);
        setEmail(dataNew?.email);
        setPhone(dataNew?.phone);
        setClinicImageOld(dataNew?.clinicImage);
        setAddress(dataNew?.address);
      } else {
        ToastError(response.data.status);
        navigate("/admin/clinics");
      }
    } catch (error) {
      ToastError(error.response.data.message);
      navigate("/admin/clinics");
    }
  }

  useEffect(() => {
    getClinicById(idClinic);
  }, []);
  return (
    <div className="content-wrapper">
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h2 className="page-title">Clinic</h2>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <FontAwesomeIcon icon={faCircleUser} />
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      View Clinic
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="box">
                <form className="form" >
                  <div className="box-body">
                    <h4 className="box-title text-info mb-3">
                      {" "}
                      Clinic Info
                    </h4>
                    <div className="row form-specialty-ad">
                      <div className="col-md-12 mb-3">
                        <div className="form-group">
                          <label style={labelStyle}>Clinic Name</label>
                          <input
                            name="clinic_name"
                            type="text"
                            value={clinicName}
                            onChange={(e) => setClinicName(e.target.value)}
                            className="form-control"
                            style={inputStyle}
                            placeholder="Enter clinic name"
                            required
                            disabled

                          />
                        </div>
                      </div>

                      <div className="col-md-6 mb-3">
                        <div className="form-group">
                          <label style={labelStyle}>Email</label>
                          <input
                            name="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            style={inputStyle}
                            placeholder="Enter email"
                            required
                            disabled

                          />
                        </div>
                      </div>

                      <div className="col-md-6 mb-3">
                        <div className="form-group">
                          <label style={labelStyle}>Phone</label>
                          <input
                            name="phone"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            style={inputStyle}
                            placeholder="Enter phone"
                            required
                            maxLength={10}
                            disabled

                          />
                        </div>
                      </div>

                      <div className="col-md-12 mb-3">
                        <div className="form-group">
                          <label style={labelStyle}>Clinic Image </label>
                          
                        </div>
                      </div>

                    

                      {imagePreview == null && clinicImageOld && (
                        <div
                          className="col-md-12 mb-3"
                          style={{ textAlign: "center" }}
                        >
                          <img
                            src={`${API_BASE_URL}images/view/${clinicImageOld}`}
                            alt="Clinic Preview"
                            style={{ maxWidth: "70%", height: "auto" }}
                          />
                          <div style={{ marginTop: "10px" }}></div>
                        </div>
                      )}

                      <div className="col-md-12 mb-3">
                        <div className="form-group">
                          <label style={labelStyle}>Address</label>
                          <textarea
                            name="address"
                            className="form-control"
                            style={inputStyle}
                            rows="3"
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            disabled
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="box-footer" style={buttonGroupStyle}>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => navigate("/admin/clinics")}
                      >
                        <i className="ti-trash"></i> Cancel
                      </button>
                     
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ViewClinic;
