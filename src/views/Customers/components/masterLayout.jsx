import React, { Fragment } from 'react'
import Header from './header'
import Footer from './footer'
import { Outlet } from 'react-router-dom'
import '../../../customerStyle'
import $ from 'jquery';

const MasterLayout = () => {
  return (
    <Fragment>
        <Header/>
          <Outlet/>
        <Footer/>  
    </Fragment>
  )
}

export default MasterLayout