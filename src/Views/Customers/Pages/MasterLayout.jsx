import React, { Fragment } from 'react'
import Header from './Header'
import Footer from './Footer'
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