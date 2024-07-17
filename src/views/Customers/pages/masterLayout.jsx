import React, { Fragment } from 'react'
import Header from './header'
import Footer from './footer'
import { Outlet } from 'react-router-dom'

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