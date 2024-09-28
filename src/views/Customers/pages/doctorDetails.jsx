
import { useNavigate, useParams } from 'react-router-dom';
import All_API from '../../../state/All_API';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../config/apiConfig';
import ScheduleDoctorLayout from '../components/ScheduleDoctorLayout';
import parse from 'html-react-parser';


const DoctorDetails = () => {
    const navigate = useNavigate()
    const { idDoctor } = useParams(); 
    const id = (typeof idDoctor === 'string' && idDoctor.includes('-'))
    ? idDoctor.split('-')[0]
    : '';

    
    const [doctor,setDoctor] = useState(null)



    console.log(doctor)

    async function getDoctorById(idObject) {
        try {
          const response = await All_API.getDoctorById(idObject);
          if (response.data.status === "success") {
            setDoctor(response.data.data);
            
          } else {
            navigate("/404");
          }
        } catch (error) {
           navigate("/404");
        }
      }
    
      useEffect(() => {
     
        getDoctorById(id);
      }, []);

    return (
        <>
            <section className="page-title bg-1">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block text-center">
                                <span className="text-white">Doctor Details</span>
                                <h1 className="text-capitalize mb-5 text-lg">{doctor?.user?.fullname}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section doctor-single">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="doctor-img-block">
                                <img src={`${API_BASE_URL}images/view/${doctor?.avatar}`} alt="doctor-image" className="img-fluid w-100 doctor-detail-lt" />
                                <div className="info-block mt-4 doctor-detail-title">
                                    <h4 className="mb-0">{doctor?.user?.fullname}</h4>
                                    <p>{doctor?.specialty?.specialtyName}</p>
                                    <ul className="list-inline mt-4 doctor-social-links">
                                        <li className="list-inline-item"><a href="#"><i className="icofont-facebook"></i></a></li>
                                        <li className="list-inline-item"><a href="#"><i className="icofont-twitter"></i></a></li>
                                        <li className="list-inline-item"><a href="#"><i className="icofont-skype"></i></a></li>
                                        <li className="list-inline-item"><a href="#"><i className="icofont-linkedin"></i></a></li>
                                        <li className="list-inline-item"><a href="#"><i className="icofont-pinterest"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8 col-md-6 pl-5">
                            <div className="doctor-details mt-4 mt-lg-0">
                                <h2 className="text-md">Introducing to myself</h2>
                                <div className="divider my-4"></div>
                                <p className="card-text doctor-exp-cle font-doctor-detail">Experience: {doctor?.experience} years</p>
                                <p className="card-text doctor-text-cle doctor-bio-cle font-doctor-detail">Qualification: {doctor?.qualification}</p>
                                    <ScheduleDoctorLayout idDoctor={id}/>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section doctor-qualification gray-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                        <h3>My Educational Qualifications</h3>
                        <div className="divider my-4"></div>
                        </div>
                    </div>
                    {doctor?.bio && typeof doctor.bio === 'string'
          ? parse(doctor.bio)
          : 'No description available'}
                    </div>
            </section>

            <section className="section doctor-skills">
                <div className="container">
                   
                
                 
            </div>
        </section >
        </>
    );
};

export default DoctorDetails;