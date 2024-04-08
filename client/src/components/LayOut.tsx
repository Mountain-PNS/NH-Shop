import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { Outlet } from 'react-router-dom'

import SignIn from '@/page/auth/SignIn'

const LayOut = () => {

  return (
    <> 
    
        <div className='relative'>
        <Header/>
        <Outlet/>
        <Footer/>
        </div>
       
    </>
  )
}

export default LayOut