import { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import All_API from '../../../state/All_API';
import { API_BASE_URL } from '../../../config/apiConfig';
import { Pagination, Stack } from '@mui/material';

// import('../../../assets/customers/css/style.css');
const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(4);
    const [keyword, setKeyword] = useState("");
    const [specialtyId, setSpecialtyId] = useState(1); 
    const navigate = useNavigate();

    const handlePaginate = (event, value) => {
        setPage(value - 1);
      };


    async function getAllDoctor(data) {
        try{
          const response = await All_API.getAllDoctor(data)
          if(response.data.status === "success") {
            setDoctors(response.data.data.doctors)
            setTotalPages(response.data.data.totalPages);
          }else {
             
          }
      }catch (error){
         
        }
      }

      async function getAllSpecialty() {
        try {
          const response = await All_API.getSpecialtyFull();
          setSpecialties(response.data.data.specialtyList);
        } catch {}
      }    

      useEffect(()=> {
        const data = { page, limit,specialtyId, keyword };
        getAllDoctor(data)
        getAllSpecialty()
     }, [page, limit,specialtyId, keyword])     

  return (
      <div>
          <section className="page-title bg-1">
              <div className="overlay"></div>
              <div className="container">
                  <div className="row">
                      <div className="col-md-12">
                          <div className="block text-center">
                              <span className="text-white">All Doctors</span>
                              <h1 className="text-capitalize mb-5 text-lg">Specalized doctors</h1>

                          </div>
                      </div>
                  </div>
              </div>
          </section>

          <section className="section doctors">
              <div className="container">
                  <div className="row justify-content-center">
                      <div className="col-lg-6 text-center">
                          <div className="section-title">
                              <h2>Doctors</h2>
                              <div className="divider mx-auto my-4"></div>
                              <p>We provide a wide range of creative services adipisicing elit. Autem maxime rem modi
                                  eaque, voluptate. Beatae officiis neque </p>
                          </div>
                      </div>
                  </div>

                  <div className="col-12 text-center  mb-5">
                  <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    
                    {specialties?.map((specialty)=> (
                          <label className={`btn ${specialtyId === specialty?.id ? 'active' : ''}`}>
                          <input
                              type="radio"
                              name="shuffle-filter"
                              value="all"
                              checked={specialtyId === specialty?.id}
                              onChange={()=>setSpecialtyId(specialty?.id)}
                          />
                              {specialty.specialtyName}
                          </label>
              
                    ))}
                    </div>
                  </div>

                  <div className="row shuffle-wrapper portfolio-gallery">
                     {doctors?.map((doctor)=> (
                         <div className="col-lg-3 col-sm-6 col-md-6 mb-4 shuffle-item"
                         data-groups="[&quot;cat1&quot;,&quot;cat2&quot;]">
                        <div className="position-relative doctor-inner-box">
                            <div className="doctor-profile">
                                <div className="doctor-img" onClick={()=>navigate(`/doctors/${doctor?.id}-${doctor?.user?.fullname}`)}>
                                    <img src={`${API_BASE_URL}images/view/${doctor?.avatar}`} alt="doctor-image"
                                         className="img-fluid w-100 doctor-img-lt"/>
                                </div>
                            </div>
                            <div className="content mt-3 card-doctors-cle" onClick={()=>navigate(`/doctors/${doctor?.id}-${doctor?.user?.fullname}`)}>
                                <h4 className="mb-0"><a>{doctor?.user?.fullname}</a></h4>
                                <p className='card-doctor-sp'>{doctor?.specialty?.specialtyName}</p>
                            </div>
                        </div>
                    </div>

                     ))}
                    


                  </div>
              </div>
              <div>
                      <Stack
                        spacing={2}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Pagination
                          count={totalPages}
                          page={page + 1}
                          onChange={handlePaginate}
                        />
                      </Stack>
                    </div>
          </section>

          <section className="section cta-page">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-7">
                          <div className="cta-content">
                              <div className="divider mb-4"></div>
                              <h2 className="mb-5 text-lg">We are pleased to offer you the <span
                                  className="title-color">chance to have the healthy</span></h2>
                              <Link to="/service" className="btn btn-main-2 btn-round-full">Get appoinment<i
                                  className="icofont-simple-right  ml-2"></i></Link>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

      </div>
  )
}

export default DoctorList