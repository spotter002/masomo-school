import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const Student = () => {
  const [students, setStudents] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const FetchStudents = async () => {
    try {
      toast.info('Fetching students...');
      const response = await axios.get('https://schoolapi-qrlm.onrender.com/student/', authHeader);
      setStudents(response.data);
      toast.dismiss();
      toast.success('Students loaded successfully');
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to load Students");
    }
  };

  useEffect(() => {
    FetchStudents();
  }, []);

  

  const handleDelete = async (id) => {
    if (!window.confirm("Sure you wanna delete this Student?")) return;
    try {
      toast.warning("Deleting student...");
      await axios.delete(`https://schoolapi-qrlm.onrender.com/student/${id}`, authHeader);
      toast.dismiss();
      toast.success("student deleted");
      FetchStudents(); // refresh list
    } catch (error) {
      toast.dismiss();
      toast.error("Error deleting student");
    }
  };

  const handleEdit = (studentData) => {
    navigate(`/admin-dashboard/students/edit`, { state: { studentData } });
  };

  return (
    <div className="container mt-2">
      <ToastContainer position='top-right' autoClose={3000} />

      {/* Breadcrumb */}
      <nav aria-label='breadcrumb' className='mb-3'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item fw-bold'><Link to='/admin-dashboard'>Dashboard</Link></li>
          <li className='breadcrumb-item active fw-bold' aria-current='page'>Students</li>
        </ol>
      </nav>

      {/* Card layout */}
      <div className="card p-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className='text-success'>
            <i className='bi bi-people-fill me-2'></i>Students List
          </h5>
          <button className='btn btn-success'
            onClick={() => navigate('/admin-dashboard/students/add')}>
            <i className='bi bi-plus-circle me-2'></i>Add Student
          </button>
        </div>

        {/* Table */}
        <div className="table-responsive">
          {students.length === 0 ? (
            <div className="alert alert-warning text-center">
              <i className='bi bi-exclamation-triangle me-2'></i> No students found!
            </div>
          ) : (
            <table className="table table-striped table-bordered table-hover">
              <thead className='table-success'>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Adm No.</th>
                  <th>D.O.B</th>
                  <th>Gender</th>
                  <th>classroom</th>
                  <th>parent</th>
                  <th>photo</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student._id}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.admissionNumber}</td>
                    <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                    <td>{student.gender}</td>
                    <td>{`${student?.classroom?.gradeLevel},${student?.classroom?.name}`||''}</td>
                    <td>{`${student?.parent?.name}, ${student?.parent?.phone}`||''}</td>
                  <td>
                    {student.photo?(
                      <img src={`https://schoolapi-qrlm.onrender.com/${student.photo}`}
                        alt="student"
                        width={60}
                        height={60}
                        />
                    ):("No photo")}
                  </td>
                    <td>
                       <button className='btn btn-sm btn-warning me-2'
                      onClick={()=>handleEdit(student)}
                      >
                        <i className='bi bi-pencil-square'></i>
                        Edit</button>
                      <br /><br />
                      <button className='btn btn-sm btn-danger me-2' onClick={()=>handleDelete(student._id)}>
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

export default Student;
