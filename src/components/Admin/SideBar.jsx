import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='text-light d-flex flex-column p-3' style={{width:'200px',background:'linear-gradient(135deg, rgb(12,79,46), rgb(54,66,159))'}
    }>
        <h3 className='text-center mb-4'>
            <i className='bi bi-speedometer2 me-3'> Panel</i>Admin</h3>

        <ul className='nav nav-pills flex-column mb-auto'>
            <li className='nav-item mb-3'>
                <h3></h3>
                <NavLink to={'/admin-dashboard'} end className={({isActive})=>isActive?'nav-link bg-success text-white fe-fold ':'nav-link text-light'}>
                    <i className='bi bi-grid me-3'></i>Dashboard
                </NavLink>
            </li>
            <li className='nav-item mb-3'>
                <h3></h3>
                <NavLink to={'/admin-dashboard/classes'} end className={({isActive})=>isActive?'nav-link bg-success text-white fe-fold ':'nav-link text-light'}>
                    <i className='bi bi-journal-bookmark me-3'></i>Classes
                </NavLink>
            </li>
            <li className='nav-item mb-3'>
                <NavLink to={'/admin-dashboard/students'} end className={({isActive})=>isActive?'nav-link bg-success text-white fe-fold ':'nav-link text-light'}>
                    <i className='bi bi-person-lines-fill me-3'></i>Studens
                </NavLink>
            </li>
            <li className='nav-item mb-3'>
                <NavLink to={'/admin-dashboard/teachers'} end className={({isActive})=>isActive?'nav-link bg-success text-white fe-fold ':'nav-link text-light'}>
                    <i className='bi bi-person-badge me-3'></i>Teachers
                </NavLink>
            </li>
            <li className='nav-item mb-3'>
                <NavLink to={'/admin-dashboard/parents'} end className={({isActive})=>isActive?'nav-link bg-success text-white fe-fold ':'nav-link text-light'}>
                    <i className='bi bi-people-fill me-3'></i>Parents
                </NavLink>
            </li>
        </ul>
    </div>
  )
}

export default SideBar