import React, { Fragment } from "react";
import HeaderDoctor from "./HeaderDoctor";
import SideBarDoctor from "./SideBarDoctor";
import { Outlet } from "react-router-dom";
import FooterDoctor from "./FooterDoctor";



function MasterLayoutDoctor() {
  return (
    <body className="hold-transition light-skin sidebar-mini theme-primary fixed">
      <div className="wrapper">
          <HeaderDoctor />
          <SideBarDoctor />
          <div className="content-wrapper">
            <div className="container-full">
            <section className="content1">
            <div className="row">

              <Outlet/>

            </div>
            </section>
            </div>
          </div>
          <FooterDoctor />
        
      </div>
    </body>
  );
}

export default MasterLayoutDoctor;
