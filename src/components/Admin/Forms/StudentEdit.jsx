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

  // Individual states instead of one big object for easier controlled inputs
  const [name, setName] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('Male');
  const [selectedClassId, setSelectedClassId] = useState('');
  const [parent, setParent] = useState('');
  const [photo, setPhoto] = useState(null);

  const [classroomList, setClassroomList] = useState([]);
  const [parentDetails, setParentDetails] = useState(null);

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  };

  // On mount: redirect if no student data
  useEffect(() => {
    if (!studentData) {
      navigate('/admin-dashboard/students');
      return;
    }
    // populate state vars from studentData for controlled inputs
    setName(studentData.name || '');
    setAdmissionNumber(studentData.admissionNumber || '');
    setDateOfBirth(studentData.dateOfBirth ? studentData.dateOfBirth.substring(0, 10) : '');
    setGender(studentData.gender || 'Male');
    setSelectedClassId(studentData.classroom?._id || '');
    setParent(studentData.parent?.nationalId || '');
    setParentDetails(studentData.parent || null);
  }, [studentData, navigate]);

  // Fetch classrooms for dropdown
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        toast.info('Fetching classes...');
        const res = await axios.get('https://schoolapi-qrlm.onrender.com/class/', authHeader);
        setClassroomList(res.data.classrooms);
        toast.dismiss();
        toast.success('Classes fetched successfully');
      } catch (error) {
        toast.dismiss();
        toast.error(error.response?.data?.message || 'Failed to fetch classes');
      }
    };
    fetchClasses();
  }, []);

  // Verify parent by nationalId and fetch details
  const verifyParent = async () => {
    if (!parent) {
      toast.error('Please enter Parent ID before verifying');
      return;
    }
    try {
      toast.info('Verifying parent...');
      const res = await axios.get(`https://schoolapi-qrlm.onrender.com/parent/${parent}`, authHeader);
      setParentDetails(res.data);
      toast.dismiss();
      toast.success('Parent verified successfully');
    } catch (error) {
      setParentDetails(null);
      toast.dismiss();
      toast.error(error.response?.data?.message || 'Parent not found');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build FormData matching backend expectation
    const updatedData = new FormData();
    updatedData.append('name', name);
    updatedData.append('dateOfBirth', dateOfBirth);
    updatedData.append('admissionNumber', admissionNumber);
    updatedData.append('gender', gender);
    updatedData.append('classroomID', selectedClassId);
    updatedData.append('parentNationalId', parent);
    if (photo) updatedData.append('photo', photo);

    try {
      toast.info('Updating student...');
      await axios.put(
        `https://schoolapi-qrlm.onrender.com/student/${studentData._id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      // console.log('the student id',studentData._id),
      console.log('the update data',updatedData);
      console.log('the student data',studentData._id);
      toast.dismiss();
      toast.success('Student updated successfully');
      navigate('/admin-dashboard/students');
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || 'Error updating student');
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h3>Edit Student</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Student Name"
          className="form-control mb-2"
          required
        />

        <input
          type="text"
          value={admissionNumber}
          onChange={(e) => setAdmissionNumber(e.target.value)}
          placeholder="Admission Number"
          className="form-control mb-2"
          required
        />

        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="form-control mb-2"
          required
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="form-control mb-2"
        >
          <option>Male</option>
          <option>Female</option>
        </select>

        <select
          className="form-select mb-2"
          value={selectedClassId}
          onChange={(e) => setSelectedClassId(e.target.value)}
          required
        >
          <option value="">Select Classroom</option>
          {classroomList.map((c) => (
            <option key={c._id} value={c._id}>
              {`${c.name}, ${c.gradeLevel}, ${c.classYear}`}
            </option>
          ))}
        </select>

        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={parent}
            onChange={(e) => setParent(e.target.value)}
            placeholder="Parent ID"
            className="form-control mb-2"
            required
          />
          <i
            className="bi bi-search"
            onClick={verifyParent}
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: 'green',
              fontSize: '1.2rem',
              pointerEvents: 'auto',
            }}
            title="Verify Parent"
          />
        </div>

        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="form-control mb-2"
          accept="image/*"
        />

        <button className="btn btn-warning" type="submit">
          Update Student
        </button>
      </form>

      {/* Show verified parent details if available */}
      {parentDetails && (
        <div className="alert alert-info mt-3">
          <strong>Parent Name:</strong> {parentDetails.name} <br />
          <strong>Email:</strong> {parentDetails.email} <br />
          <strong>Phone:</strong> {parentDetails.phone}
        </div>
      )}
    </div>
  );
};

export default StudentEdit;
