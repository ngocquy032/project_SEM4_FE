import React, { Fragment } from "react";

import { Outlet } from "react-router-dom";
import FooterAdmin from "./footerAdmin";
import HeaderAdmin from "./headerAdmin";
import SildeBar from "./SildeBar";
import Demo from "../demo";


function MasterLayoutAdmin() {
  return (
    <body className="hold-transition light-skin sidebar-mini theme-primary fixed">
      <div className="wrapper">
          <HeaderAdmin />
          <SildeBar />
          <div className="content-wrapper">
            <div className="container-full">
            <section className="content1">
            <div className="row">

              <Demo />

            </div>
            </section>
            </div>
          </div>
          <FooterAdmin />
        
      </div>
    </body>
  );
}

export default MasterLayoutAdmin;
