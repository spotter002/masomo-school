import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'
import DashBoardNavbar from '../DashBoardNavbar'

const AdminLayout = () => {
  return (
    <div className='d-flex'>
        <SideBar/>
        <div className="flex-grow-1">
          <DashBoardNavbar/>
            <main className='p-4 vh-100'>
                {/* <Outlet renders the matched child routes element/> */}
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default AdminLayout