import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import All_API from "../../../state/All_API";
import { API_BASE_URL } from "../../../config/apiConfig";

const Service = () => {
  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState([]);
  const [page, setPage] = useState("");
  const [limit, setLimit] = useState("");
  const [keyword, setKeyword] = useState("");

  async function getSpecialtiesAll(data) {
    try {
      const response = await All_API.getAllSpecialty(data);
      if (response.data.status === "success") {
        setSpecialties(response.data.data.specialtyList);
      } else {
      }
    } catch (error) {}
  }

  useEffect(() => {
    const data = { page, limit, keyword };
    getSpecialtiesAll(data);
  }, [page, limit, keyword]);

  return (
    <div>
      <section class="page-title bg-1">
        <div class="overlay"></div>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="block text-center">
                <span class="text-white">Our services</span>
                <h1 class="text-capitalize mb-5 text-lg">
                  All Department Care Department
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section service-2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 text-center">
              <div className="section-title">
                <h2>Award winning patient care</h2>
                <div className="divider mx-auto my-4"></div>
                <p>
                  Let us better understand the need for pain so that we can
                  become more resilient, even as joy gets entangled in the
                  troubles of those who praise us. Let him seek greater things.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {specialties?.map((specialty) => (
              <div className="col-lg-4 col-md-6">
                <div className="department-block mb-5 ">
                  <img
                    src={`${API_BASE_URL}images/view/${specialty?.specialtyImage}`}
                    alt=""
                    className="img-fluid w-100 img-specilaty-client"
                    onClick={()=> navigate(`/service/specialty/${specialty?.id}-${specialty?.specialtyName}`)}
                  />
                  <div className="content content-specialty-tiltle" >
                    <h4 className="mt-4 mb-2 title-color"  onClick={()=> navigate(`/service/specialty/${specialty?.id}-${specialty?.specialtyName}`)}
                    >{specialty?.specialtyName}</h4>
                    
                    <Link to={`/service/specialty/${specialty?.id}-${specialty?.specialtyName}`} className="read-more">
                      Learn More <i className="icofont-simple-right ml-2 "></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section class="section cta-page">
        <div class="container">
          <div class="row">
            <div class="col-lg-7">
              <div class="cta-content">
                <div class="divider mb-4"></div>
                <h2 class="mb-5 text-lg">
                  We are pleased to offer you the{" "}
                  <span class="title-color">chance to have the healthy</span>
                </h2>
                <a href="appoinment.html" class="btn btn-main-2 btn-round-full">
                  Get appoinment<i class="icofont-simple-right  ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Service;
