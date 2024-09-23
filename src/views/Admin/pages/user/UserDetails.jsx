import React, { useEffect, useState } from 'react'
import { faCircleUser, faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import All_API from '../../../../state/All_API';

const UserDetails = () => {
  const { userId } = useParams(); // Lấy userId từ URL
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await All_API.getUserById(userId);
        if (response.data) {
          setUser(response.data.data);
          console.log('datadetails', response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    }
    fetchUser();
  }, [userId]);

  const cancle = () => {
    navigate('/admin/userList')
  }


  return (
    <div class="content-wrapper">
      <div class="container-full">
        <div class="content-header">
          <div class="d-flex align-items-center">
            <div class="me-auto">
              <h2 class="page-title">Users</h2>
              <div class="d-inline-block align-items-center">
                <nav>
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a><FontAwesomeIcon icon={faCircleUser} /></a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">View User</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <section class="content">
          <div class="row">
            <div class=" col-12">
              <div class="box">
                <div class="box-header with-border">
                </div>
                {/* <!-- /.box-header --> */}
                <form class="form">
                  <div class="box-body">
                    <h4 class="box-title text-info mb-0"><i class="ti-user me-15"></i> User Info
                    </h4>
                    <div class="my-15">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Full Name</label>
                            <input type="text" class="form-control"
                              placeholder="Full Name"
                              value={user?.fullname || 'N/A'}
                              // onChange={inputChange}
                              name='fullname'
                              readOnly 
                              />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Address</label>
                            <input type="text" class="form-control"
                              placeholder="Address"
                              value={user?.address || 'N/A'}
                              // onChange={inputChange}
                              name='address' 
                              disabled/>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">E-mail</label>
                            <input type="text" class="form-control"
                              placeholder="E-mail"
                              value={user?.email ||  'N/A'}
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
                              value={user?.phone_number || 'N/A'}
                              // onChange={inputChange}
                              name='phone_number' 
                              disabled/>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-3">
                          <div class="form-group">
                            <label class="form-label">BirthDay</label>
                            <input type="text" class="form-control"
                              placeholder="BirthDay"
                              value={user?.birthday || 'N/A'}
                              // onChange={inputChange}
                              name='birthday' 
                              disabled/>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label class="form-label">Gender</label> <br />
                            <input type="text" class="form-control"
                              placeholder="Gender"
                              value={user?.gender || 'N/A'}
                              // onChange={inputChange}
                              name='gender'
                              disabled />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label class="form-label">Roler</label>
                            <input type="text" class="form-control"
                              placeholder="Role"
                              value={user?.role?.name || 'N/A'}
                              name='role'
                              disabled
                              // onChange={inputChange}
                              />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label class="form-label">Active</label>
                            <input type="text" class="form-control"
                              placeholder=""
                              value={user?.is_active || 'N/A'}
                              // onChange={inputChange}
                              disabled
                              name='is_active' />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="my-15">
                      <div class="box-footer">
                        <button type="button" class="btn btn-warning me-1" onClick={cancle}>
                          <i class="ti-trash"></i> Cancel
                        </button>
                      
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
  )
}

export default UserDetails