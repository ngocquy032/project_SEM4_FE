import React, { Fragment } from 'react'
import Header from './header'
import Footer from './footer'
import { Outlet } from 'react-router-dom'
import '../../../styleCustomers.css'
import ScrollTop from '../../../scrollTop.jsx'

const MasterLayout = () => {
    const contentStyle = {
        paddingTop: '100px',
        fontSize: '18px'// Điều chỉnh giá trị này cho phù hợp với chiều cao của header
    };

    return (
    <Fragment>
        <Header/>
        <ScrollTop />

        <div style={contentStyle}>
            <Outlet/>
        </div>

        <Footer/>  
    </Fragment>
  )
}

export default MasterLayout