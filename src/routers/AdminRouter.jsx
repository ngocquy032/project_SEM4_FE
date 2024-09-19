import React from 'react'
import { Route, Routes, Link } from "react-router-dom";
import Demo from "../views/Admin/demo";
import '../assets/admins/css/styleAdmin.css'
import MasterLayoutAdmin from "../views/Admin/componets/masterLayoutAdmin";
import UserList from '../views/Admin/pages/user/UserList';
import UserAdd from '../views/Admin/pages/user/UserAdd';
import LoginAdmin from '../views/Admin/pages/loginAdmin';
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



const AdminRouter = () => {
  return (
    <Routes>

      {/* components không có header và footer */}
      <Route path='/login' element={< LoginAdmin />} />

      {/* components có chung header và footer */}
      <Route path='/' element={<MasterLayoutAdmin />}>
        <Route index element={<Demo />} />
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