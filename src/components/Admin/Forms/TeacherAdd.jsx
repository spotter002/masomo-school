import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const AddTeacher = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [phone, setPhone] = useState('');
  const [teachers, setTeachers] = useState([]);

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Fetch teachers
  const FetchTeacher = async () => {
    try {
      toast.info('Fetching teachers...');
      const res = await axios.get('https://schoolapi-qrlm.onrender.com/teacher', authHeader);
      toast.dismiss();
      console.log('Fetched teachers:', res.data);
      setTeachers(res.data);
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || 'Something went wrong when fetching teachers');
      console.error(error);
    }
  };

  useEffect(() => {
    FetchTeacher();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.info('Adding teacher...');
      const data = { name, email, subject, phone };
      const res = await axios.post('https://schoolapi-qrlm.onrender.com/teacher', data, authHeader);
      toast.dismiss();
      toast.success('Teacher added successfully');
      console.log(res.data);
      navigate('/admin-dashboard/teachers');
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || 'Error adding teacher');
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <nav aria-label='breadcrumb' className='mb-3'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item fw-bold'><Link to='/admin-dashboard'>Dashboard</Link></li>
          <li className='breadcrumb-item fw-bold'><Link to='/admin-dashboard/teachers'>Teachers</Link></li>
          <li className='breadcrumb-item active fw-bold' aria-current='page'>Add Teacher</li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className='text-success'>
            <i className='bi bi-person-plus-fill me-2'></i>Add New Teacher
          </h5>
          <Link className='btn btn-success' to='/admin-dashboard/teachers'>
            <i className='bi bi-arrow-left-circle-fill me-2'></i>Back to Teachers
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="tel"
                className="form-control"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-success">
            <i className='bi bi-check-circle-fill me-2'></i>Add Teacher
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;
