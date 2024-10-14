import React from 'react';
import { useNavigate } from 'react-router-dom';

function FooterDoctor(props) {
  const navigate = useNavigate();
    return (
     <footer class="main-footer">
 
	  &copy; 2024 <a href='' onClick={()=> navigate('/doctor')}>Novena Clinic</a>. All Rights Reserved.
  </footer>
  
    );
}

export default FooterDoctor;