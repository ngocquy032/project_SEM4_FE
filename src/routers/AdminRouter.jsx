import React from 'react'
import {Route, Routes} from "react-router-dom";
import Demo from "../views/Admin/demo";
import '../assets/admins/css/styleAdmin.css'
import MasterLayoutAdmin from "../views/Admin/componets/masterLayoutAdmin";


const AdminRouter = () => {
  return (
      <Routes>

        {/* components không có header và footer */}
        {/*<Route path='/demo' element={<Demo />} />*/}

          {/* components có chung header và footer */}
          <Route path='/' element={<MasterLayoutAdmin/>}>
              <Route index element={<Demo />} />


              <Route path='*' element={<div>404 Not Found</div>} />
          </Route>

      </Routes>
  )
}

export default AdminRouter