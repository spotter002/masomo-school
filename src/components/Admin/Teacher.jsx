import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  };

   const FetchTeacher=async()=>{
        try {
            toast.info('Fetching teacher...')
            const res = await axios.get('https://schoolapi-qrlm.onrender.com/teacher',authHeader)
            toast.dismiss()
            console.log('Teacher get',res.data)
            setTeachers(res.data)
        } catch (error) {
            toast.dismiss()
            toast.error(error.response?.data?.message || 'Something went wrong when fetching teacher')
            console.log(error)
        }
    }
    useEffect(() => {
        FetchTeacher()
    },[])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await axios.delete(`https://schoolapi-qrlm.onrender.com/teacher/${id}`, authHeader);
        toast.success('Teacher deleted');
        FetchTeacher();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Delete failed');
      }
    }
  };

  const handleEdit = (teacher) => {
    navigate('/admin-dashboard/teachers/edit', { state: { teacherData: teacher } });
  };

  useEffect(() => {
    FetchTeacher();
  }, []);

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h4 className="mb-3">Teachers</h4>
      <button className="btn btn-success mb-3" onClick={() => navigate('/admin-dashboard/teachers/add')}>
        Add Teacher
      </button>
      <div className="table-responsive">
        {teachers.length === 0 ? (
          <div className="alert alert-warning">No teachers found</div>
        ) : (
          <table className="table table-bordered table-hover">
            <thead className="table-success">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subject</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t, i) => (
                <tr key={t._id}>
                  <td>{i + 1}</td>
                  <td>{t.name}</td>
                  <td>{t.email}</td>
                  <td>{t.phone}</td>
                  <td>{t.subject}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(t)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TeacherList;
