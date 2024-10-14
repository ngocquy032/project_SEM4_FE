import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SideBarDoctor = () => {
  const navigate = useNavigate();
  const [openItem, setOpenItem] = useState(null);

  const handleItem = (value) => {
    if (openItem !== value) {
      setOpenItem(value);
    } else {
      setOpenItem(null);
    }
  };
  return (
    <aside className="main-sidebar">
      {/* <!-- sidebar--> */}
      <section className="sidebar position-relative">
        <div className="multinav">
          <div className="multinav-scroll" style={{ height: "100%" }}>
            {/* <!-- sidebar menu--> */}
            <ul className="sidebar-menu" data-widget="tree">
              <li className="treeview ">
                <a onClick={() => navigate("/doctor/patients")}>
                  <img
                    src="/admin/images/icons/patient.png"
                    alt=""
                    className="icon-admin-nav"
                  />

                  <span>Manage Doctor's Patient</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>

              <li className="treeview ">
                <a onClick={() => navigate("/doctor/schedules")}>
                  <img
                    src="/admin/images/icons/calendar.png"
                    alt=""
                    className="icon-admin-nav"
                  />

                  <span>View Doctor's Schedule</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
            </ul>

            <div className="sidebar-widgets mt-dcss">
              <div className="mx-25 mb-30 pb-20  side-bx bg-primary-light rounded20">
                <div className="text-center">
                  <img
                    src="/admin/images/custom-17.svg"
                    className="sideimg "
                    alt=""
                  />
                  <h4 className="title-bx text-primary">
                    Make an Appointments
                  </h4>
                  <a href="#" className="py-10 fs-14 mb-0 text-primary">
                    Best Helth Care here <i className="mdi mdi-arrow-right"></i>
                  </a>
                </div>
              </div>
              <div className="copyright text-center m-25">
                <p>
                  <strong className="d-block">Novena Dashboard</strong> ©{" "}
                  <script>document.write(new Date().getFullYear())</script> All
                  Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </aside>
  );
};

export default SideBarDoctor;
