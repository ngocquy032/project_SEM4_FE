import React, { useEffect, useState } from 'react'
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import '../assets/admins/css/styleAdmin.css'
import { useDispatch } from 'react-redux';
import All_API from '../state/All_API';
import MasterLayoutDoctor from '../views/Doctor/components/MasterLayoutDoctor';
import PatientsList from '../views/Doctor/pages/PatientsList';
import { addUserDoctor } from '../state/Auth/authDoctorSlice';
import LoginDoctor from '../views/Doctor/pages/LoginDoctor';
import { addInfoDoctor } from '../state/Auth/infoDoctorSlice';
import BookingPatientDetail from '../views/Doctor/pages/BookingPatientDetail';
import DoctorSchedule from '../views/Doctor/pages/DoctorSchedule';



const DoctorRouter = () => {
  const jwt = localStorage.getItem("jwtDoctor");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userLoaded, setUserLoaded] = useState(false); 
  const [doctorLoaded, setDoctorLoaded] =useState(false); 
  async function getUser(token) {
    try{
      const data = await All_API.getUserAPI(token)
      dispatch(addUserDoctor(data.data.data))
      if(data.data?.data.role.id === 3) {
        await getInfoDoctor(data.data?.data.id)
        setUserLoaded(false)
      }else {
        setUserLoaded(true)
      }
    }catch {
      setUserLoaded(true)
    } 
  }

  async function getInfoDoctor(userId) {
    try{
      const data = await All_API.getInfoDoctorByUserId(userId)
      dispatch(addInfoDoctor(data.data.data))
    }catch {
      setDoctorLoaded(true)
    } 
  }



  useEffect(() => {

    getUser(jwt);

    if (userLoaded) {
      navigate('/doctor/login');
    }
  }, [jwt, userLoaded]);

  return (
    <Routes>

      {/* components không có header và footer */}
      <Route path='/login' element={< LoginDoctor />} />

      {/* components có chung header và footer */}
      <Route path='/' element={<MasterLayoutDoctor />}>
      <Route path='/patients' element={<PatientsList />} />
      <Route path='/patients/:idBooking' element={<BookingPatientDetail />} />
      <Route path='/schedules' element={<DoctorSchedule />} />



        


        <Route path='*' element={<div className="error-section" style={{ margin: '7% 27%'}}>
          <div className="container-fluid faq-container">
            <div className="error-content text-center">
              {/* <img className="error-content__icon" src="admin/images/404.svg" alt="404" width="62"
                height="62" /> */}
              <h2 className="error-content__title">
                404. Page not found.
              </h2>
              <p>
                Sorry, we couldn’t find the page you where looking
                for. We suggest that you return to homepage.
              </p>
              <div className="error-content__btn btn">
                <Link to="/admin/">Back to homepage</Link>
              </div>
            </div>
          </div>
        </div>} />
      </Route>

    </Routes>
  )
}

export default DoctorRouter