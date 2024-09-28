import React, { useState } from 'react';
import Profile from '../components/account/Profile';
// import Home from './Home';
// import Profile from './Profile';
// import Messages from './Messages';

function Account() {
	const [activeTab, setActiveTab] = useState('profile');  // Quản lý trạng thái của tab hiện tại

	// Hàm để thay đổi tab khi người dùng click
	const handleTabClick = (tabName) => {
		setActiveTab(tabName);
	};

	// Hàm để render component tương ứng với tab hiện tại
	const renderTabComponent = () => {
		switch (activeTab) {
			case 'profile':
				return <Profile />;
			// case 'profile':
			//     return <Profile />;
			// case 'messages':
			//     return <Messages />;
			default:
				return <Profile />;
		}
	};

	return (
		<div>
			{/* Section tiêu đề của trang Account */}
			<section className="page-title bg-1">
				<div className="overlay"></div>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="block text-center">
								<span className="text-white">Account</span>
								<h1 className="text-capitalize mb-5 text-lg">Get in Account</h1>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Section nội dung của trang */}
			<section className="content">
				<div className="row">
					<div className="col-12">
						<div className="box">
							<div className="box-body">
								<div className="vtabs">
									{/* Các tab cho phép người dùng chuyển đổi giữa các nội dung */}
									<ul className="nav nav-tabs tabs-vertical">

										<li className="nav-item">
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

										<li className="nav-item">
											<a
												className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
												style={{ backgroundColor: activeTab === 'home' ? '#e12454' : 'white', color: activeTab === 'home' ? 'white' : 'black' }}
												onClick={() => handleTabClick('home')}
											>
												<span className="hidden-sm-up">
													<i className="ion-home"></i>
												</span>
												<span className="hidden-xs-down">Home</span>
											</a>
										</li>

										<li className="nav-item">
											<a
												className={`nav-link ${activeTab === 'messages' ? 'active' : ''}`}
												style={{ backgroundColor: activeTab === 'messages' ? '#e12454' : 'white', color: activeTab === 'messages' ? 'white' : 'black' }}
												onClick={() => handleTabClick('messages')}
											>
												<span className="hidden-sm-up">
													<i className="ion-email"></i>
												</span>
												<span className="hidden-xs-down">Messages</span>
											</a>
										</li>
									</ul>

									{/* Nội dung của từng tab sẽ hiển thị ở đây */}
									<div className="tab-content" style={{ padding: '10px 20px' }}>
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
