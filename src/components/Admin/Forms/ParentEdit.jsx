// src/pages/admin/parents/ParentEdit.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ParentEdit = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const selectedParent = state?.parentData;

  const [form, setForm] = useState({
    name: '',
    email: '',
    nationalId: '',
    phone: '',
    address: '',
    occupation: '',
  });

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    if (!selectedParent) {
      toast.error('No parent selected');
      setTimeout(() => {
        navigate('/admin-dashboard/parents');
      }, 2000);
      return;
    }
    setForm({
      name: selectedParent.name || '',
      email: selectedParent.email || '',
      nationalId: selectedParent.nationalId || '',
      phone: selectedParent.phone || '',
      address: selectedParent.address || '',
      occupation: selectedParent.occupation || '',
    });
  }, [selectedParent, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.info('Updating parent...');
      await axios.put(
        `https://schoolapi-qrlm.onrender.com/parent/${selectedParent._id}`,
        form,
        authHeader
      );
      toast.dismiss();
      toast.success('Parent updated successfully!');
      navigate('/admin-dashboard/parents');
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || 'Error updating parent');
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <ToastContainer position='top-right' autoClose={3000} />
      
      {/* Breadcrumb */}
      <nav aria-label='breadcrumb' className='mb-3'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item fw-bold'>
            <Link to='/admin-dashboard'>Dashboard</Link>
          </li>
          <li className='breadcrumb-item fw-bold'>
            <Link to='/admin-dashboard/parents'>Parents</Link>
          </li>
          <li className='breadcrumb-item active fw-bold' aria-current='page'>
            Edit Parent
          </li>
        </ol>
      </nav>

      <div className='card p-4 shadow-sm mb-4'>
        <div className='d-flex justify-content-between align-items-center mb-3'>
          <h5 className='text-success'>
            <i className='bi bi-person-lines-fill me-3'></i>Update Parent
          </h5>
          <Link className='btn btn-success' to='/admin-dashboard/parents'>
            <i className='bi bi-arrow-left-circle-fill me-2'></i>Back to Parents
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='row'>
            {['name', 'email', 'nationalId', 'phone', 'address'].map((field, index) => (
              <div className='col-md-6 mb-3' key={index}>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  className='form-control'
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>
          <button type='submit' className='btn btn-success'>
            <i className='bi bi-check-circle-fill me-2'></i>Update Parent
          </button>
        </form>
      </div>
    </div>
  );
};

export default ParentEdit;
