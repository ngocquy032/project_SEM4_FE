import React from 'react'
import { Route, Routes, Link } from "react-router-dom";
import Demo from "../views/Admin/demo";
import '../assets/admins/css/styleAdmin.css'
import MasterLayoutAdmin from "../views/Admin/componets/masterLayoutAdmin";
import UserList from '../views/Admin/pages/user/UserList';
import UserAdd from '../views/Admin/pages/user/UserAdd';
import LoginAdmin from '../views/Admin/pages/loginAdmin';
import UserDetails from '../views/Admin/pages/user/UserDetails';
import UserUpdate from '../views/Admin/pages/user/UserUpdate';



const AdminRouter = () => {
  return (
    <Routes>

      {/* components không có header và footer */}
      <Route path='/loginAdmin' element={< LoginAdmin />} />

      {/* components có chung header và footer */}
      <Route path='/' element={<MasterLayoutAdmin />}>
        <Route index element={<Demo />} />
        <Route path='/userList' element={<UserList />} />
        <Route path='/userAdd' element={<UserAdd />} />
        <Route path='/userDetails/:userId' element={<UserDetails />} />
        <Route path='/userUpdate/:userId' element={<UserUpdate />} />

        


        


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