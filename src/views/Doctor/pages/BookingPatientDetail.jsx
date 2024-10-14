import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import All_API from "../../../state/All_API";
import { ToastError, ToastSuccess } from "../../../notification";
import Select from "react-select";

import {
  convertDataToDateString,
  convertToDateString,
  convertToTimeString,
} from "../../Admin/componets/ConvertData";
import { faL } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../Customers/components/Loading";

const BookingPatientDetail = () => {
  const buttonGroupStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "20px",
  };
  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();
  const { idBooking } = useParams();
  const [openViewModal, setOpenViewModal] = useState(false);
  const [diagnosis, setDiagnosis] = useState('')
  const [history, setHistory] = useState(null)
  const [medicines, setMedicines]= useState([])
  const [isLoad, setIsLoad] = useState(false)
  const [awaitLoad, setAwaitLoad] = useState(false)
  const [prescriptions, setPrescriptions] = useState([
    { medicine: "", unit: 0, desciptionUsage: "" },
  ]);


  const handleSubmit = (event)=> {
    event.preventDefault();
	
		const data = new FormData(event.currentTarget);
		const historyData = {
      diagnosis: diagnosis,
			prescriptions: prescriptions
		};

    updateHistory(idBooking,historyData)
  }
  // Predefined array of medication names for react-select
  const medicationList = medicines.map(medicine => ({
    value: medicine.medicationName,
    label: medicine.medicationName
  }));

  const handleInputChange = (index, field, value) => {
    const updatedPrescriptions = prescriptions.map((prescription, i) =>
      i === index ? { ...prescription, [field]: value } : prescription
    );
    setPrescriptions(updatedPrescriptions);
  };

  const addPrescription = () => {
    setPrescriptions([
      ...prescriptions,
      { medicine: "", unit: 0, desciptionUsage: "" },
    ]);
  };

  const deletePrescription = (index) => {
    const updatedPrescriptions = prescriptions.filter((_, i) => i !== index);
    setPrescriptions(updatedPrescriptions);
  };

  async function getBookingById(bookingId) {
    try {
      const response = await All_API.getBookingByDoctor(bookingId);
      if (response.data.status === "success") {
        setBooking(response.data.data);
      } else {
        ToastError(response.data.status);
        navigate("/doctor/patients");
      }
    } catch (error) {
      ToastError(error.response.data.message);
      navigate("/doctor/patients");
    }
  }
  async function updateHistory(idBooking, historyData) {
    setAwaitLoad(true)
    try{
    const response = await All_API.updateHistory(idBooking, historyData)
    if(response.data.status === "success") {
      const emailData = {
        toEmail: booking.user.email,
        subject: "Your Medical Results",
        medical_results: {
              fullname: booking.user.fullname,
              email: booking.user.email,
              phone_number: booking.user.phone_number,
              doctor_name: booking.schedule.doctor_name,
              specialty_name: booking.schedule.specialty_name,
              clinic_name: booking.schedule.clinic_name,
              date_schedule: convertDataToDateString(booking.schedule.date_schedule),
              diagnosis: diagnosis,
              prescriptions: prescriptions
    }
    
      }
      await sendEmailMedicine(emailData)
      setIsLoad(true)
    }else {
      ToastError(response.data.message)
    }
    }catch (error){
    ToastError(error.response.data.message)
    }
    setAwaitLoad(false)
  }

  async function sendEmailMedicine(medicalExRs) {
    try {
      const response = await All_API.sendEmailMedicine(medicalExRs);
      if (response.data.status === "success") {
        ToastSuccess("Create successfully diagnoses and prescriptions.(Email Sent)")
      } else {
      }
    } catch (error) {
    }
  }

  async function getHistoryByBookingId(bookingId) {
    try {
      const response = await All_API.getHistoryByBookingId(bookingId);
      if (response.data.status === "success") {
        setHistory(response.data.data);
      } else {
      }
    } catch (error) {
    }
  }

  async function getAllMedicine() {
    try {
      const response = await All_API.getAllMedicine();
      if (response.data.status === "success") {
        setMedicines(response.data.data.medications);

      } else {
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    getBookingById(idBooking);
    getHistoryByBookingId(idBooking)
    getAllMedicine()
  }, [idBooking]);

  useEffect(() => {
    if (history?.diagnosis) {
      setDiagnosis(history.diagnosis);
      setPrescriptions(history.prescriptions);
    }
  }, [history, isLoad]);
  return (
    <div class="content-wrapper">
                   {awaitLoad && <Loading />}

      <div class="container-full">
        {/* <!-- Content Header (Page header) --> */}
        <div class="content-header">
          <div class="d-flex align-items-center">
            <div class="me-auto">
              <section class="content">
                <div class="row">
                  <div class="col-12">
                    <div class="box">
                      <div className="row ">
                        <div className="col-lg-6 g-1">
                          <div class="appoits-card ">
                            <div className="row ">
                              <div class="appoits-card-header col-lg-4">
                                <img
                                  src="https://storage.googleapis.com/a1aa/image/dUwTsAFeZFwaV6ne1fMiovWfwMkSsu2hskTzCLzAUHKnNVMOB.jpg"
                                  alt="Doctor icon"
                                />

                                <div class="appoits-time crcs-6">
                                  <img
                                    className="appoits-icon-sc"
                                    src="/customer/images/clock.svg"
                                    alt=""
                                  />
                                  <span>
                                    {convertToTimeString(
                                      booking?.schedule?.start_time
                                    )}{" "}
                                    -{" "}
                                    {convertToTimeString(
                                      booking?.schedule?.end_time
                                    )}
                                  </span>
                                </div>
                                <div class="appoits-date crcs-6">
                                  <img
                                    className="appoits-icon-sc"
                                    src="/customer/images/calendar.svg"
                                    alt=""
                                  />
                                  <span>
                                    {convertToDateString(
                                      booking?.schedule?.date_schedule
                                    )}
                                  </span>
                                </div>
                              </div>
                              <div class="appoits-card-body col-lg-8">
                                <p>
                                  <strong>Patient: </strong>
                                  <strong>{booking?.user.fullname}</strong>
                                </p>
                                <p>
                                  <strong>Birthday: </strong>{" "}
                                  {booking?.user.birthday}
                                </p>
                                <p>
                                  <strong>Phone: </strong>{" "}
                                  {booking?.user.phone_number}
                                </p>
                                <p>
                                  <strong>Email: </strong>
                                  {booking?.user.email}
                                </p>
                                <p>
                                  <strong>Gender: </strong>
                                  {booking?.user.gender}
                                </p>
                                <p>
                                  <strong>Adress: </strong>
                                  {booking?.user.address}
                                </p>
                                <p>
                                  <strong>Reason: </strong>
                                  {booking?.reason}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="presctr-card">
                            <form onSubmit={handleSubmit}>
                            <div className="form-group">
                          <label class="form-label">Diagnosis </label>
                          <textarea
                            name="diagnosis"
                            type="text"
                            className="form-control diagnosis-tx-dc"
                            id="diagnosis"
                            required
                            rows={2}
                            value={diagnosis}
                            onChange={(e)=> setDiagnosis(e.target.value)}
                            disabled={history?.diagnosis ? true : false}
                          >
                          </textarea>
                        </div>
                            
                           {!history?.diagnosis &&    <button
                                onClick={addPrescription}
                                className="add-prescrtr"
                                type="button"
                              >
                                Add Prescription
                              </button>}
                            {history?.diagnosis &&  <label class="form-label">Prescriptions </label> }
                              {prescriptions.map((prescription, index) => (
                                <div className="prescrt-container" key={index}>
                                  <Select
                                    className="sl-presctr"
                                    options={medicationList}
                                    placeholder="Drug"
                                    value={
                                      prescription.medicine
                                        ? {
                                            value: prescription.medicine,
                                            label: prescription.medicine,
                                          }
                                        : null
                                    }
                                    onChange={(selectedOption) =>
                                      handleInputChange(
                                        index,
                                        "medicine",
                                        selectedOption.value
                                      )
                                    }
                                  
                                  />

                                  <input
                                    type="number"
                                    value={prescription.unit}
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        "unit",
                                        e.target.value
                                      )
                                    }
                                    disabled={history?.diagnosis ? true : false}
                                  />
                                  <input
                                    type="text"
                                    placeholder="Enter user manual"
                                    value={prescription.desciptionUsage}
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        "desciptionUsage",
                                        e.target.value
                                      )
                                    }
                                    disabled={history?.diagnosis ? true : false}
                                  />
                               {!history?.diagnosis  &&    <span
                                    className="delete-icon"
                                    onClick={() => deletePrescription(index)}
                                  >
                                    &#128465;
                                  </span>}
                                </div>
                              ))}

<div className="box-footer" style={buttonGroupStyle}>
                    
                    {!history?.diagnosis &&   <button type="submit" className="btn btn-primary">
                        <i className="ti-save-alt"></i> Save
                      </button>}
                    </div>

                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPatientDetail;
