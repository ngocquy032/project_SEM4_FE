import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import All_API from '../../../state/All_API';
import { ToastError } from '../../../notification';
import parse from 'html-react-parser';
import { API_BASE_URL } from '../../../config/apiConfig';
import ScheduleDoctorLayout from '../components/ScheduleDoctorLayout';

const DepartmentDetails = () => {
    const navigate = useNavigate()
    const { idNameSpecialty } = useParams(); 
    const id = (typeof idNameSpecialty === 'string' && idNameSpecialty.includes('-'))
    ? idNameSpecialty.split('-')[0]
    : '';
    const [specialty, setSpecialty] = useState(null);
    const [clinics, setClinics] = useState([]);
    const [doctors, setDoctors] = useState([]);


    async function getSpecialtyById(idObject) {
        try {
            const response = await All_API.getSpecialtyById(idObject);
            if (response.data.status === "success") {
                setSpecialty(response.data.data)
             
            } else {
                ToastError(response.data.status);
                navigate('/service');
            }
        } catch (error) {
            ToastError(error.response.data.message);
            navigate('/service');
        }
    }
    async function getAllClinic() {
        try{
          const response = await All_API.getClinicFull()
          setClinics(response.data.data.clinicList)
        }catch {
          
        }
      }

      async function getDoctorBySpecialty(specialtyId) {
        try{
          const response = await All_API.getDoctorBySpecialty(specialtyId)
          if(response.data.status === "success") {
            setDoctors(response.data.data.doctors)
          }else {
             
          }
      }catch (error){
         
        }
      }

    useEffect(()=> {
        getSpecialtyById(id)
        getAllClinic()
        getDoctorBySpecialty(id)
    },[])

   

   
    return (
        <div>
            <section className="page-title bg-1">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block text-center">
                                <span className="text-white">Department Details</span>
                                <h1 className="text-capitalize mb-5 text-lg">{specialty?.specialtyName}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section department-single department-single-v2">
                <div className="container">
                   

                    <div className="row">
                        <div className="col-lg-8">
                            <div className="department-content mt-5">
                                <h3 className="text-md">{specialty?.specialtyName}</h3>
                                <div className="divider my-4"></div>

 <div className="specialty-desciption-client">
        {specialty?.description && typeof specialty.description === 'string'
          ? parse(specialty.description)
          : 'No description available'}
      </div>                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="sidebar-widget schedule-widget mt-5">
                                <h5 className="mb-4">Time Schedule</h5>
                                <ul className="list-unstyled">
                                    <li className="d-flex justify-content-between align-items-center">
                                        <a >Monday - Friday</a>
                                        <span>7:00 - 17:00</span>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                        <a >Saturday</a>
                                        <span>7:00 - 16:00</span>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                        <a >Sunday</a>
                                        <span>Closed</span>
                                    </li>
                                </ul>

                                <div className="department-address mt-4">
                                    <h5>Address</h5>
                                    {clinics.map((clinic)=> (
                                        <p>- {clinic?.address}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-lg-12">
                            <h3 className="mb-4">Doctors in this Department</h3>
                            <div className="divider my-4"></div>
                            <div className="row">
                                {doctors.map((doctor) => (
                                    <div key={doctor?.id} className="col-md-12 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className='row'>
                                                    <div className='col-md-6 card-doctor-cle '>
                                                        <div className='doctor-lcle'>
                                                            <img   src={`${API_BASE_URL}images/view/${doctor?.avatar}`}
                                                             alt="Doctor avatar" className='img-doctor-cle' />
                                                            <div className='btn-more-cle'>
                                                            <a onClick={()=>navigate(`/doctors/${doctor?.id}-${doctor?.user?.fullname}`)}>See more</a>
                                                            </div>
                                                        </div>
                                                        <div className='doctor-rcle'>
                                                        <h4 className="card-title doctor-fullname-cle">{doctor?.user?.fullname}</h4>
                                                            <p className="card-text doctor-exp-cle">Experience: {doctor?.experience} years</p>
                                                            <p className="card-text doctor-text-cle doctor-bio-cle">Qualification: {doctor?.qualification}</p>
                                                        </div>
                                               
                                                    </div>
                                                    <div className='col-md-6'>
                                                    <h5 className="card-subtitle mb-2 mt-2">Schedule:</h5>
                                                        <ScheduleDoctorLayout idDoctor={doctor?.id}/>
                                                    </div>
                                                </div>
                                               
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                  
                </div>
            </section>
        </div>
    );
}

export default DepartmentDetails;
