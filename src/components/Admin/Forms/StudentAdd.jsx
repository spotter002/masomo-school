// StudentAdd.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../context/AuthContext';

const StudentAdd = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    admissionNumber: '',
    dateOfBirth: '',
    gender: 'Male',
    classroom: '',
    parent: '',
    photo: null,
  });

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  };

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
    const studentData = new FormData();
    for (let key in formData) {
      studentData.append(key, formData[key]);
    }
    try {
      toast.info("Adding student...");
      await axios.post("https://schoolapi-qrlm.onrender.com/student", studentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.dismiss();
      toast.success("Student added successfully");
      navigate('/admin-dashboard/students');
    } catch (err) {
      toast.dismiss();
      toast.error("Error adding student");
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h3>Add Student</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Student Name" required className="form-control mb-2" />
        <input type="text" name="admissionNumber" value={formData.admissionNumber} onChange={handleChange} placeholder="Admission Number" required className="form-control mb-2" />
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="form-control mb-2" required />
        <select name="gender" value={formData.gender} onChange={handleChange} className="form-control mb-2">
          <option>Male</option>
          <option>Female</option>
        </select>
        <input type="text" name="classroom" value={formData.classroom} onChange={handleChange} placeholder="Classroom ID" required className="form-control mb-2" />
        <input type="text" name="parent" value={formData.parent} onChange={handleChange} placeholder="Parent ID" required className="form-control mb-2" />
        <input type="file" name="photo" onChange={handleChange} className="form-control mb-2" accept="image/*" />
        <button className="btn btn-success" type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default StudentAdd;
