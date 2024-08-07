import React, { Fragment } from 'react';

import { Outlet } from "react-router-dom";
import FooterAdmin from './footerAdmin';
import HeaderAdmin from './headerAdmin';
// import 'D:\\Source_Reactjs\\project_SEM4\\FE\\team2_medical_fe\\src\\styleAdmin.css'
// D:\Source_Reactjs\project_SEM4\FE\team2_medical_fe\src\views\Admin\componets

function MasterLayoutAdmin() {
    return (
        <Fragment>
            <HeaderAdmin/>
            <Outlet/>
            <FooterAdmin/>
        </Fragment>
    );
}

export default MasterLayoutAdmin;