import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const ParentList = () => {
  const [parents, setParents] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const fetchParents = async () => {
    try {
      toast.info('Fetching parents...');
      const response = await axios.get('https://schoolapi-qrlm.onrender.com/parent/', authHeader);
      setParents(response.data);
      toast.dismiss();
      toast.success('Parents loaded successfully');
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to load parents");
    }
  };
  useEffect(() => {
    fetchParents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Sure you wanna delete this parent?")) return;
    try {
      toast.warning("Deleting parent...");
      await axios.delete(`https://schoolapi-qrlm.onrender.com/parent/${id}`, authHeader);
      toast.dismiss();
      toast.success("Parent deleted");
      fetchParents(); // refresh list
    } catch (error) {
      toast.dismiss();
      toast.error("Error deleting parent");
    }
  };

  const handleEdit = (parentData) => {
    navigate(`/admin-dashboard/parents/edit`, { state: { parentData } });
  };


  return (
    <div className="container mt-2">
      <ToastContainer position='top-right' autoClose={3000} />

      {/* Breadcrumb */}
      <nav aria-label='breadcrumb' className='mb-3'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item fw-bold'><Link to='/admin-dashboard'>Dashboard</Link></li>
          <li className='breadcrumb-item active fw-bold' aria-current='page'>Parents</li>
        </ol>
      </nav>

      {/* Card layout */}
      <div className="card p-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className='text-success'>
            <i className='bi bi-people-fill me-2'></i>Parent List
          </h5>
          <button className='btn btn-success'
            onClick={() => navigate('/admin-dashboard/parents/add')}>
            <i className='bi bi-plus-circle me-2'></i>Add Parent
          </button>
        </div>

        {/* Table */}
        <div className="table-responsive">
          {parents.length === 0 ? (
            <div className="alert alert-warning text-center">
              <i className='bi bi-exclamation-triangle me-2'></i> No parents found!
            </div>
          ) : (
            <table className="table table-striped table-bordered table-hover">
              <thead className='table-success'>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>National ID</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {parents.map((parent, index) => (
                  <tr key={parent._id}>
                    <td>{index + 1}</td>
                    <td>{parent.name}</td>
                    <td>{parent.email}</td>
                    <td>{parent.nationalId}</td>
                    <td>{parent.phone}</td>
                    <td>{parent.address}</td>
                    <td>
                       <button className='btn btn-sm btn-warning me-2'
                      onClick={()=>handleEdit(parent)}
                      >
                        <i className='bi bi-pencil-square'></i>
                        Edit</button>
                      <br /><br />
                      <button className='btn btn-sm btn-danger me-2' onClick={()=>handleDelete(parent._id)}>
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
  );
};

export default ParentList;
