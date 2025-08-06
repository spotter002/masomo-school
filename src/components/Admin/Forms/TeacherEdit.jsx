import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const EditTeacher = () => {
  const { state } = useLocation();
  const { teacherData } = state || {};
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: ''
  });

  useEffect(() => {
    if (!teacherData) {
      toast.error('No teacher selected');
      setTimeout(() => navigate('/admin-dashboard/teachers'), 2000);
    } else {
      setFormData({ ...teacherData });
    }
  }, [teacherData, navigate]);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      toast.info('Updating teacher...');
      await axios.put(`https://schoolapi-qrlm.onrender.com/teacher/${teacherData._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.dismiss();
      toast.success('Teacher updated successfully');
      navigate('/admin-dashboard/teachers');
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || 'Error updating teacher')
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold">
            <Link to="/admin-dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item fw-bold">
            <Link to="/admin-dashboard/teachers">Teachers</Link>
          </li>
          <li className="breadcrumb-item active fw-bold" aria-current="page">
            Edit Teacher
          </li>
        </ol>
      </nav>

      {/* Card wrapper */}
      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-primary">
            <i className="bi bi-person-lines-fill me-3"></i>Update Teacher
          </h5>
          <Link to="/admin-dashboard/teachers" className="btn btn-primary">
            <i className="bi bi-arrow-left-circle-fill me-2"></i>Back to Teachers
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="name"
                placeholder="Teacher Name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            {/* <div className="col-md-6 mb-3">
              <input
                type="email"
                name="email"
                placeholder="Teacher Email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div> */}
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="form-control"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-success">
            <i className="bi bi-check-circle-fill me-2"></i>Update Teacher
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTeacher;
