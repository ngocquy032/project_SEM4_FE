import React, { useEffect, useState } from 'react'
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import '../assets/admins/css/styleAdmin.css'
import MasterLayoutAdmin from "../views/Admin/componets/masterLayoutAdmin";
import UserList from '../views/Admin/pages/user/UserList';
import UserAdd from '../views/Admin/pages/user/UserAdd';
import LoginAdmin from '../views/Admin/pages/LoginAdmin';
import ScheduleList from '../views/Admin/pages/schedule/ScheduleList';
import AddSchedule from '../views/Admin/pages/schedule/AddSchedule';
import UpdateSchedule from '../views/Admin/pages/schedule/UpdateSchedule';
import TimeSlotList from '../views/Admin/pages/timeSlot/TimeSlotList';
import AddTimeSlot from '../views/Admin/pages/timeSlot/AddTimeSlot';
import UpdateTimeSlot from '../views/Admin/pages/timeSlot/UpdateTimeSlot';
import ViewTimeSlot from '../views/Admin/pages/timeSlot/ViewTimeSlot';
import ViewSchedule from '../views/Admin/pages/schedule/ViewSchedule';
import BookingList from '../views/Admin/pages/booking/BookingList';
import UserDetails from '../views/Admin/pages/user/UserDetails';
import UserUpdate from '../views/Admin/pages/user/UserUpdate';
import ViewBooking from '../views/Admin/pages/booking/ViewBooking';
import UpdateBooking from '../views/Admin/pages/booking/UpdateBooking';
import MedicationList from '../views/Admin/pages/medication/MedicationList';
import SpecialtyList from '../views/Admin/pages/specialty/SpecialtyList';
import AddSpeciaty from '../views/Admin/pages/specialty/AddSpecialty';
import UpdateSpecialty from '../views/Admin/pages/specialty/UpdateSpecialty';
import ViewSpecialty from '../views/Admin/pages/specialty/ViewSpecialty';
import DoctorList from '../views/Admin/pages/doctor/DoctorList';
import AddDoctor from '../views/Admin/pages/doctor/AddDoctor';
import UpdateDoctor from '../views/Admin/pages/doctor/UpdateDoctor';
import ClinicList from '../views/Admin/pages/clinic/ClinicList';
import AddClinic from '../views/Admin/pages/clinic/AddClinic';
import UpdateClinic from '../views/Admin/pages/clinic/UpdateClinic';
import ViewClinic from '../views/Admin/pages/clinic/ViewClinic';
import { useDispatch } from 'react-redux';
import { addUserAdmin } from '../state/Auth/authAdminSlice';
import All_API from '../state/All_API';
import RefundInvoiceList from '../views/Admin/pages/refundInvoice/RefundInvoiceList';
import ContactList from '../views/Admin/pages/contact/ContactList';
import Dashboard from '../views/Admin/Dashboard';
import ViewDoctor from '../views/Admin/pages/doctor/ViewDoctor';



const AdminRouter = () => {
  const jwt = localStorage.getItem("jwtAdmin");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userLoaded, setUserLoaded] = useState(false); 

  async function getUser(token) {
    try{
      const data = await All_API.getUserAPI(token)
      dispatch(addUserAdmin(data.data.data))
      if(data.data?.data.role.id === 2) {
        setUserLoaded(false)
      }else {
        setUserLoaded(true)
      }
    }catch {
      setUserLoaded(true)
    } 
  }

  useEffect(() => {

    getUser(jwt);
    if (userLoaded) {
      navigate('/admin/login');
    }
  }, [jwt, userLoaded]);

  return (
    <Routes>

      {/* components không có header và footer */}
      <Route path='/login' element={< LoginAdmin />} />

      {/* components có chung header và footer */}
      <Route path='/' element={<MasterLayoutAdmin />}>
        <Route index element={<Dashboard />} />
        <Route path='/userList' element={<UserList />} />
        <Route path='/userAdd' element={<UserAdd />} />
        <Route path='/userDetails/:userId' element={<UserDetails />} />
        <Route path='/userUpdate/:userId' element={<UserUpdate />} />

        



        <Route path='/schedules' element={<ScheduleList />} />
        <Route path='/schedules/add' element={<AddSchedule />} />
        <Route path='/schedules/update/:idSchedule' element={<UpdateSchedule />} />
        <Route path='/schedules/:idSchedule' element={<ViewSchedule />} />

        <Route path='/timeSlots' element={<TimeSlotList />} />
        <Route path='/timeSlots/add' element={<AddTimeSlot />} />
        <Route path='/timeSlots/:idTimeSlot' element={<ViewTimeSlot />} />
        <Route path='/timeSlots/update/:idTimeSlot' element={<UpdateTimeSlot />} />

        <Route path='/bookings' element={<BookingList />} />
        <Route path='/bookings/:idBooking' element={<ViewBooking />} />
        <Route path='/bookings/update/:idBooking' element={<UpdateBooking />} />

        <Route path='/medications' element={<MedicationList />} />

        <Route path='/specialties' element={<SpecialtyList />} />
        <Route path='/specialties/add' element={<AddSpeciaty />} />
        <Route path='/specialties/update/:idSpecialty' element={<UpdateSpecialty />} />
        <Route path='/specialties/:idSpecialty' element={<ViewSpecialty />} />

        <Route path='/doctors' element={<DoctorList />} />
        <Route path='/doctors/add' element={<AddDoctor />} />
        <Route path='/doctors/update/:idDoctor' element={<UpdateDoctor />} />
        <Route path='/doctors/:idDoctor' element={<ViewDoctor />} />


        <Route path='/clinics' element={<ClinicList />} />
        <Route path='/clinics/add' element={<AddClinic />} />
        <Route path='/clinics/update/:idClinic' element={<UpdateClinic />} />
        <Route path='/clinics/:idClinic' element={<ViewClinic />} />

        <Route path='/refund-invoices' element={<RefundInvoiceList />} />

        <Route path='/contacts' element={<ContactList />} />

        


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

export default AdminRouter