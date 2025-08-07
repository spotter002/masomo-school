// src/pages/admin/parents/ParentAdd.jsx
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../context/AuthContext';

const ParentAdd = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    nationalId: '',
    phone: '',
    address: '',
    occupation: '',
  });
  const { token } = useContext(AuthContext);
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://schoolapi-qrlm.onrender.com/parent/addParent', form, authHeader);
      toast.success('Parent added successfully!');
      navigate('/admin-dashboard/students/add');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding parent');
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer position='top-right' autoClose={3000}/>
      {/* breadcrums provide ease in path locaation */}
      <nav aria-label='breadcrumb' className='mb-3'>
        <ol className='breadcrumb'>
            <li className='breadcrumb-item fw-bold'><Link to='/admin-dashboard'>Dashboard</Link></li>
            <li className='breadcrumb-item fw-bold'><Link to='/admin-dashboard/parents'>Parents</Link></li>
            <li className='breadcrumb-item active fw-bold' aria-label='page'>Add Parent</li>
        </ol>
      </nav>
      <h2>Add New Parent</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {['name', 'email', 'nationalId', 'phone'].map((field, index) => (
            <div className="col-md-6 mb-3" key={index}>
              <input
                type={field === 'email' ? 'email' : 'text'}
                className="form-control"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-success">Add Parent</button>
      </form>
    </div>
  );
};

export default ParentAdd;
