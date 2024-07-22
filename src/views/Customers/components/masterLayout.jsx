import React, { Fragment } from 'react'
import Header from './header'
import Footer from './footer'
import { Outlet } from 'react-router-dom'
import '../../../styleCustomers.css'

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