
// StudentEdit.jsx
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../context/AuthContext';

const StudentEdit = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { studentData } = location.state || {};

  const [formData, setFormData] = useState({ ...studentData });

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    if (!studentData) navigate('/admin-dashboard/students');
  }, [studentData, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    for (let key in formData) {
      updatedData.append(key, formData[key]);
    }
    try {
      toast.info("Updating student...");
      await axios.put(`https://schoolapi-qrlm.onrender.com/student/${studentData._id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.dismiss();
      toast.success("Student updated successfully");
      navigate('/admin-dashboard/students');
    } catch (err) {
      toast.dismiss();
      toast.error("Error updating student");
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h3>Edit Student</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control mb-2" required />
        <input type="text" name="admissionNumber" value={formData.admissionNumber} onChange={handleChange} className="form-control mb-2" required />
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth?.substring(0, 10)} onChange={handleChange} className="form-control mb-2" required />
        <select name="gender" value={formData.gender} onChange={handleChange} className="form-control mb-2">
          <option>Male</option>
          <option>Female</option>
        </select>
        <input type="text" name="classroom" value={formData.classroom} onChange={handleChange} className="form-control mb-2" required />
        <input type="text" name="parent" value={formData.parent} onChange={handleChange} className="form-control mb-2" required />
        <input type="file" name="photo" onChange={handleChange} className="form-control mb-2" accept="image/*" />
        <button className="btn btn-warning" type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default StudentEdit;