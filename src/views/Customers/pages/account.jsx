import React, { useState } from 'react';
import Profile from '../components/account/Profile';
import UpdateAccount from '../components/account/UpdateAccount';
import { useNavigate } from 'react-router-dom';
import ScrollTop from '../../../scrollTop';
import BookingList from '../components/account/BookingList';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../../state/Auth/authUserSlice';
import { ToastSuccess } from '../../../notification';
// import Home from './Home';
// import Profile from './Profile';
// import Messages from './Messages';

function Account() {
	const [activeTab, setActiveTab] = useState('profile');  // Quản lý trạng thái của tab hiện tại
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Hàm để thay đổi tab khi người dùng click
	const handleTabClick = (tabName) => {
		setActiveTab(tabName);
	};

	// Hàm để render component tương ứng với tab hiện tại
	const renderTabComponent = () => {
		switch (activeTab) {
			case 'profile':
				return <Profile onUpdate={() => handleTabClick('update')} />;
			case 'update':
			    return < UpdateAccount  onSuccess={() => handleTabClick('profile')} />;
			case 'bookingList':
			    return <BookingList onBookingAction={handleTabClick} />;
			default:
				return <Profile />;
		}
	};


	
	const handleLogout= ()=> {
        localStorage.removeItem("jwt")
        dispatch(removeUser())
        ToastSuccess("Logout in successfully.")
		navigate('/login')
    
      }
	return (
		<div>
			{/* Section tiêu đề của trang Account */}
			<section className="page-title bg-1">
				<div className="overlay"></div>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="block text-center">
								<h1 className="text-capitalize mb-5 text-lg">Account Page</h1>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Section nội dung của trang */}
			<section className="content" >
				<div className="row">
					<div className="col-12">
						<div className="box">
							<div className="box-body">
								<div className="vtabs">
									{/* Các tab cho phép người dùng chuyển đổi giữa các nội dung */}
									<ul className="nav nav-tabs tabs-vertical" >

										<li className="nav-item" style={{ width: '200px'}}>
											<a
												className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
												style={{ backgroundColor: activeTab === 'profile' ? '#e12454' : 'white', color: activeTab === 'profile' ? 'white' : 'black' }}
												onClick={() => handleTabClick('profile')}
											>
												<span className="hidden-sm-up">
													<i className="ion-person"></i>
												</span>
												<span className="hidden-xs-down">Profile</span>
											</a>
										</li>
										<li className="nav-item" style={{ width: '200px'}}>
											<a
												className={`nav-link ${activeTab === 'update' ? 'active' : ''}`}
												style={{ backgroundColor: activeTab === 'update' ? '#e12454' : 'white', color: activeTab === 'update' ? 'white' : 'black' }}
												onClick={() => handleTabClick('update')}
											>
												<span className="hidden-sm-up">
													<i className="ion-person"></i>
												</span>
												<span className="hidden-xs-down">Update Profile</span>
											</a>
										</li>

										<li className="nav-item">
											<a
												className={`nav-link ${activeTab === 'bookingList' ? 'active' : ''}`}
												style={{ backgroundColor: activeTab === 'bookingList' ? '#e12454' : 'white', color: activeTab === 'bookingList' ? 'white' : 'black' }}
												onClick={() => handleTabClick('bookingList')}
											>
												<span className="hidden-sm-up">
													<i className="ion-home"></i>
												</span>
												<span className="hidden-xs-down">List Booking</span>
											</a>
										</li>

										<li className="nav-item">
											<a onClick={()=> handleLogout()}
												className={`nav-link ${activeTab === 'messages' ? 'active' : ''}`}
												style={{ backgroundColor: activeTab === 'messages' ? '#e12454' : 'white', color: activeTab === 'messages' ? 'white' : 'black' }}
											
											>
												<span className="hidden-sm-up">
													<i className="ion-email"></i>
												</span>
												<span className="hidden-xs-down">Logout</span>
											</a>
										</li>
									</ul>

									{/* Nội dung của từng tab sẽ hiển thị ở đây */}
									<div className="tab-content" style={{ padding: '10px 20px', width: '100%' }}>
										{renderTabComponent()}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Account;
