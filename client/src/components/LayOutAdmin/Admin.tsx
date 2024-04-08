import React from 'react'
import { Outlet } from 'react-router-dom'
import Aside from './Aside'
import Header from './Header'
import Footer from './Footer'

const Admin = () => {
  return (
    <div className="bg-[#F9F1E7] grid grid-cols-[20%,80%] relative ">
  <div className=''>
    <Aside />
  </div>
  <main className=''>
    <Header  />
    <div className=''>
      <Outlet />
    </div>
    <Footer  />
  </main>
</div>

  )
}

export default Admin