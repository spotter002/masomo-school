import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'


const Classes = () => {
    const [classes, setClasses] = useState([])
    const {token} = useContext(AuthContext)
    const navigate = useNavigate()
    // we prepare our authHeader
    const authHeader = {
        headers: {Authorization: `Bearer ${token}`}
    }
    console.log(token)

    const FetchClasses = async () => {
        try {
          toast.info('Fetching classes...')
            const res = await axios.get('https://schoolapi-qrlm.onrender.com/class/',authHeader)
            console.log(res.data)
            setClasses(res.data.classrooms)
            toast.dismiss()
            toast.success('Classes fetched successfully')
        } catch (error) {
          toast.dismiss()
          toast.error(error.response?.data?.message || 'Something went wrong when fetching classes')
          console.log(error)
        }

        
      }
      //we use useEffect  so that the fetch function can get exxecuted immidietly the component has been mounted
      useEffect(() => {
          FetchClasses()
      }, [])

      //delete function 
      const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this class?')) {
          try {
            toast.warning('Deleting class...')
            await axios.delete(`https://schoolapi-qrlm.onrender.com/class/${id}`,authHeader)
            FetchClasses()
          }
          catch (error) {
            toast.dismiss()
            toast.error(error.response?.data?.message || 'Something went wrong when deleting class')
            console.log(error)
          }
        }
      }
  return (
    <div className="container mt-2">
      <ToastContainer position='top-right' autoClose={3000}/>
      {/* breadcrums provide ease in path locaation */}
      <nav aria-label='breadcrumb' className='mb-3'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item fw-bold'><Link to='/admin-dashboard'>Dashboard</Link></li>
          <li className='breadcrumb-item active fw-bold' aria-label='page'>Classes</li>
        </ol>
      </nav>

      {/* card */}
      <div className="card p-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className='text-success'>
            <i className='bi bi-journal-bookmark me-3'></i>Classes List
          </h5>
          <button className='btn btn-success'>
            <i className='bi bi-plus-circle me-2'></i>Add Class
          </button>
        </div>
        {/* list of the classes */}
        <div className="table-responsive">
          {classes.length ===0?(
            <div className="alert alert-warning texr-center">
              <i className='bi bi-exclamation-triangle me-2'></i> No classes found !!!
            </div>
          ):(
            <table className="table table-striped table-bordered table-hover">
              <thead className='table-success'>
                <tr>
                  <th>#</th>
                  <th>Class Name</th>
                  <th>Grade Level</th>
                  <th>Class Year</th>
                  <th>Class Teacher</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls, index) => (
                  <tr key={cls._id}>
                    <td>{index+1}</td>
                    <td>{cls.name}</td>
                    <td>{cls.gradeLevel}</td>
                    <td>{cls.classYear}</td>
                    <td>{cls.teacher?.name || 'N/A'}</td>
                    <td>{cls.teacher?.phone || 'N/A'}</td>
                    <td>
                      <button className='btn btn-sm btn-warning me-2'>
                        <i className='bi bi-pencil-square'></i>
                        Edit</button>
                      <br /><br />
                      <button className='btn btn-sm btn-danger me-2' onClick={()=>handleDelete(cls._id)}>
                        <i className='bi bi-trash'></i>
                        Delete</button>
                    </td> 
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default Classes



