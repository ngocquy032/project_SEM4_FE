import logo from './logo.svg';
import './App.css'
import {  Route, Routes } from 'react-router-dom';
import AdminRouter from './routers/AdminRouter';
import CustomerRouter from './routers/CustomerRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DoctorRouter from './routers/DoctorRouter';
function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Routes>
          <Route path='/*' element={<CustomerRouter/>}/>
        <Route path='/admin/*' element={<AdminRouter/>}/>
        <Route path='/doctor/*' element={<DoctorRouter/>}/>

      </Routes>
    </div>

  );

}

export default App;
