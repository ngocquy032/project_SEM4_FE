import logo from './logo.svg';
import './App.css'
import {  Route, Routes } from 'react-router-dom';
import AdminRouter from './routers/AdminRouter';
import CustomerRouter from './routers/CustomerRouter';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/admin/*' element={<AdminRouter/>}/>
        <Route path='/*' element={<CustomerRouter/>}/>
      </Routes>
    </div>
  );
}

export default App;
