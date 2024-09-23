import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const SildeBar = () => {
	const navigate = useNavigate()
	const [openItem, setOpenItem] = useState(null)

	const handleItem = (value) => {
		if(openItem !== value) {
			setOpenItem(value)
		}else {
			setOpenItem(null)
		}
	}
  return (
<aside className="main-sidebar">
    {/* <!-- sidebar--> */}
    <section className="sidebar position-relative">
	  	<div className="multinav">
		  <div className="multinav-scroll" style={{height: "100%"}}>	
			  {/* <!-- sidebar menu--> */}
			  <ul className="sidebar-menu" data-widget="tree">			
				<li className="treeview ">
				  <a href="#">
				  <img src="/admin/images/icons/dasboard.png" alt="" className='icon-admin-nav'/>

					<span>Dashboard</span>
					<span className="pull-right-container">

					</span>
				  </a>
				
				</li>
				<li>
				  <a href="appointments.html">
					<i className="icon-Barcode-read"><span className="path1"></span><span className="path2"></span></i>
					<span>Appointments</span>
				  </a>
				</li>			
				<li className={`treeview ${openItem === 1 ? 'active menu-open' : ''}`}>
				<a onClick={()=> handleItem(1)}>
				<img src="/admin/images/icons/users.png" alt="" className='icon-admin-nav'/>
					<span> Users</span>
					<span className="pull-right-container">
					  <img className=" pull-right icon-down" src='/admin/images/icons/down-arrow.png' alt=''/>
					</span>
				  </a>
				  <ul className="treeview-menu">
				  <li> <Link to="/admin/userAdd"><i className="icon-Commit"><span className="path1"></span><span className="path2"></span></i>Add User </Link></li>
					<li><Link to="/admin/userList"><i className="icon-Commit"><span className="path1"></span><span className="path2"></span></i>List User</Link></li>
				  </ul>
				</li>

				<li className={`treeview ${openItem === 3 ? 'active menu-open' : ''}`}>
				<a onClick={()=> handleItem(3)}>
				<img src="/admin/images/icons/clinic.png" alt="" className='icon-admin-nav'/>
				<span>Clinics</span>
					<span className="pull-right-container">
					<img className=" pull-right icon-down" src='/admin/images/icons/down-arrow.png' alt=''/>
					</span>
				  </a>
				  <ul className="treeview-menu">
					<li><a onClick={()=> navigate('/admin/clinics/add')}><i className="icon-Commit"><span className="path1"></span><span className="path2"></span></i>Add Clinic</a></li>
					<li><a onClick={()=> navigate('/admin/clinics/add')}><i className="icon-Commit"><span className="path1"></span><span className="path2"></span></i>List Clinic</a></li>
				  </ul>
				</li>
						
				<li className={`treeview ${openItem === 4 ? 'active menu-open' : ''}`}>
				<a onClick={()=> handleItem(4)}>
				<img src="/admin/images/icons/medicine.png" alt="" className='icon-admin-nav'/>
				<span>Specialty</span>
					<span className="pull-right-container">
					<img className=" pull-right icon-down" src='/admin/images/icons/down-arrow.png' alt=''/>
					</span>
				  </a>
				  <ul className="treeview-menu">
					<li><a onClick={()=> navigate('/admin/specialties/add')}><i className="icon-Commit"><span className="path1"></span><span className="path2"></span></i>Add Specialty</a></li>
					<li><a onClick={()=> navigate('/admin/specialties')}><i className="icon-Commit"><span className="path1"></span><span className="path2"></span></i>List Specialty</a></li>
				  </ul>
				</li>			
				

				<li className={`treeview ${openItem === 2 ? 'active menu-open' : ''}`}>
				<a onClick={()=> handleItem(2)}>
				<img src="/admin/images/icons/doctor.png" alt="" className='icon-admin-nav'/>
				<span>Doctors</span>
					<span className="pull-right-container">
					<img className=" pull-right icon-down" src='/admin/images/icons/down-arrow.png' alt=''/>
					</span>
				  </a>
				  <ul className="treeview-menu">
					<li><a onClick={()=> navigate('/admin/doctors/add')}><i className="icon-Commit"><span className="path1"></span><span className="path2"></span></i>Add Doctor</a></li>
					<li><a onClick={()=> navigate('/admin/doctors')}><i className="icon-Commit"><span className="path1"></span><span className="path2"></span></i>List Doctor</a></li>
				  </ul>
				</li>
				

			

				
			
			
			
			     
			  </ul>
			  
			  <div className="sidebar-widgets">
				  <div className="mx-25 mb-30 pb-20 side-bx bg-primary-light rounded20">
					<div className="text-center">
						<img src="/admin/images/custom-17.svg" className="sideimg " alt=""/>
						<h4 className="title-bx text-primary">Make an Appointments</h4>
						<a href="#" className="py-10 fs-14 mb-0 text-primary">
							Best Helth Care here <i className="mdi mdi-arrow-right"></i>
						</a>
					</div>
				  </div>
				<div className="copyright text-center m-25">
					<p><strong className="d-block">Novena Dashboard</strong> © <script>document.write(new Date().getFullYear())</script> All Rights Reserved</p>
				</div>
			  </div>
		  </div>
		</div>
    </section>
  </aside>
  )
}

export default SildeBar
