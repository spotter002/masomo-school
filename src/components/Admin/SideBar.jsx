import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='text-light d-flex flex-column p-3' style={{width:'200px',background:'linear-gradient(135deg, rgb(12,79,46) rgb(54,66,159))'}
    }>
        <h3 className='text-center mb-4'>
            <i className='bi bi-speedometer2 me-3'>Admin Panel</i></h3>

        <ul className='nav nav-pills flex-column mb-auto'>
            <li className='nav-item'>
                <h3></h3>
                <NavLink to={'/admin-dashboard'} end className={({isActive})=>isActive?'nav-link bg-success text-white fe-fold ':'nav-link text-muted'}>
                    <i className='bi bi-grid me-3'>Dashboard</i>
                </NavLink>
            </li>
            <li className='nav-item'>
                <NavLink to={'/admin-dashboard'} end className={({isActive})=>isActive?'nav-link bg-success text-white fe-fold ':'nav-link text-muted'}>
                    <i className='bi bi-person-lines-fill me-3'>Studens</i>
                </NavLink>
            </li>
            <li className='nav-item'>
                <NavLink to={'/admin-dashboard'} end className={({isActive})=>isActive?'nav-link bg-success text-white fe-fold ':'nav-link text-muted'}>
                    <i className='bi bi-phone me-3'>Dashboard</i>
                </NavLink>
            </li>
        </ul>
    </div>
  )
}

export default SideBar