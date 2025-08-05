import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'


const ClassEdit = () => {

    const{token}=useContext(AuthContext)
    const [name,setName]=useState('')
    const[gradeLevel,setGradeLevel]=useState('')
    const[classYear,setClassYear]=useState('')
    const[teacher,setTeacher]=useState([])
    const[selectedTeacherIds,setSelectedTeacherIds]=useState('')
    const navigate=useNavigate()
    const {state}=useLocation()
    const selectedClass = state?.classData
    console.log('selected class',selectedClass)

    const authHeader={
        headers:{Authorization:`Bearer ${token}`}
    }

    const FetchTeacher=async()=>{
        try {
            toast.info('Fetching teacher...')
            const res = await axios.get('https://schoolapi-qrlm.onrender.com/teacher',authHeader)
            toast.dismiss()
            console.log('Teacher get',res.data)
            setTeacher(res.data)
        } catch (error) {
            toast.dismiss()
            toast.error(error.response?.data?.message || 'Something went wrong when fetching teacher')
            console.log(error)
        }
    }
    useEffect(() => {
        FetchTeacher()
    },[])

    // use effect to update the hooks inthis componenet
    useEffect(() => {
        if(!selectedClass){
            toast.error('No class selected')
            setTimeout(() => {
                navigate('/admin-dashboard/classes')
            }, 2000);
            return
        }
        setName(selectedClass?.name||'')
        setGradeLevel(selectedClass?.gradeLevel||'')
        setClassYear(selectedClass?.classYear||'')
        setSelectedTeacherIds(selectedClass?.teacher||'')
    },[selectedClass , navigate])
  return (
      <div className='container'>
             <ToastContainer position='top-right' autoClose={3000}/>
          {/* breadcrums provide ease in path locaation */}
          <nav aria-label='breadcrumb' className='mb-3'>
            <ol className='breadcrumb'>
                <li className='breadcrumb-item fw-bold'><Link to='/admin-dashboard'>Dashboard</Link></li>
                <li className='breadcrumb-item fw-bold'><Link to='/admin-dashboard/classes'>Classes</Link></li>
                <li className='breadcrumb-item active fw-bold' aria-label='page'>Edit Class</li>
            </ol>
          </nav>
          <div className="card p-4 shadow-sm mb-4">
             <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className='text-success'>
                <i className='bi bi-journal-bookmark me-3'></i>Update Class
              </h5>
              <Link className='btn btn-success' to='/admin-dashboard/classes'
              ><i className='bi bi-arrow-left-circle-fill me-3'></i>Back to Classes</Link>
            </div>
    
            {/* form to post class */}
    
            <form action="">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <input type="text" className='form-control' placeholder='Class Name' value={name} onChange={(e)=>setName(e.target.value)} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <input type="text" className='form-control' placeholder='Grade Level' value={gradeLevel} onChange={(e)=>setGradeLevel(e.target.value)} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <input type="number" className='form-control' placeholder='Class Year' value={classYear} onChange={(e)=>setClassYear(e.target.value)} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <select className='form-select' 
                      value={selectedTeacherIds}
                        onChange={(e)=>setSelectedTeacherIds(e.target.value)}>
                        
                        <option value="">Select Teacher</option>
                        {teacher.map((teacher,index)=>(
                            
                            <option key={teacher._id} value={teacher._id}>{`${teacher.name} , ${teacher.subject}`}</option>
                        ))}
                      </select>
                    </div>
                </div>
                <button type='submit' className='btn btn-success'>
                    <i className='bi bi-check-circle-fill me-3'></i> Update Class
                </button>
            </form>
          </div>
        </div>
  )
}

export default ClassEdit