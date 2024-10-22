import React, { useEffect, useState } from 'react'
import All_API from '../../../state/All_API';
import { faCircleUser, faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const ProfileDoctor = () => {

    const [createForm, setCreateForm] = useState([]);
    const token = localStorage.getItem('jwtDoctor');
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await All_API.getUserAPI(token);
            if (response.data) {
              setCreateForm(response.data.data);
              setUserId(response.data.data.id);
            }
      
    
          } catch (error) {
            console.error('Failed to fetch user details:', error);
          }
    
        }
        fetchUser();
      }, [token]);
  return (
    <div class="content-wrapper profile-user-sc" style={{ margin: '5% 15% 0 15%' }}>
      <div class="container-full">
        <div class="content-header">
          <div class="d-flex align-items-center">
            <div class="me-auto">
              <h2 class="page-title">Profile</h2>
              <div class="d-inline-block align-items-center">
                <nav>
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a><FontAwesomeIcon icon={faCircleUser} /></a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Profile View</li>
                  </ol>
                </nav>
              </div>
            </div>

          </div>
        </div>
        <div class="tab-pane " >
          <div class="p-15">


            <section class="content">
              <div class="row">
                <div class=" col-12">
                  <div class="box">
                    <div class="box-header with-border">
                    </div>
                    {/* <!-- /.box-header --> */}
                    <form class="form">
                      <div class="box-body">
                        <h4 class="box-title text-info mb-0"><i class="ti-user me-15"></i> Profile Info
                        </h4>
                        <div class="my-15">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group">
                                <label class="form-label">Full Name</label>
                                <input type="text" class="form-control"
                                  placeholder="Full Name"
                                  value={createForm?.fullname || 'N/A'}
                                  // onChange={inputChange}
                                  name='fullname'
                                  disabled
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <label class="form-label">Address</label>
                                <input type="text" class="form-control"
                                  placeholder="Address"
                                  value={createForm?.address || 'N/A'}
                                  // onChange={inputChange}
                                  name='address'
                                  disabled />
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group">
                                <label class="form-label">E-mail</label>
                                <input type="text" class="form-control"
                                  placeholder="E-mail"
                                  value={createForm?.email || 'N/A'}
                                  // onChange={inputChange}
                                  name='email'
                                  disabled />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <label class="form-label">Contact Number</label>
                                <input type="text" class="form-control"
                                  placeholder="Phone"
                                  value={createForm?.phone_number || 'N/A'}
                                  // onChange={inputChange}
                                  name='phone_number'
                                  disabled />
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group">
                                <label class="form-label">Birthday</label>
                                <input type="text" class="form-control"
                                  placeholder="E-mail"
                                  value={createForm?.birthday || 'N/A'}
                                  // onChange={inputChange}
                                  name='birthday'
                                  disabled />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <label class="form-label">Gender</label>
                                <input type="text" class="form-control"
                                  placeholder="Phone"
                                  value={createForm?.gender || 'N/A'}
                                  // onChange={inputChange}
                                  name='gender'
                                  disabled />
                              </div>
                            </div>
                          </div>
                          
                        </div>

                       
                      </div>
                    </form >
                  </div>
                </div>
              </div>
            </section>
          </div>

        </div>



      </div>
    </div>
  )
}

export default ProfileDoctor