import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../context/AuthContext';

const StudentAdd = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [classroom, setClassroom] = useState([]);
  const [parentDetails, setParentDetails] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState('');

  // 💡 Individual state vars
  const [name, setName] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('Male');
  const [parent, setParent] = useState('');
  const [photo, setPhoto] = useState(null);

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    const FetchClasses = async () => {
      try {
        toast.info('Fetching classes...');
        const res = await axios.get('https://schoolapi-qrlm.onrender.com/class/', authHeader);
        setClassroom(res.data.classrooms);
        toast.dismiss();
        toast.success('Classes fetched successfully');
      } catch (error) {
        toast.dismiss();
        toast.error(error.response?.data?.message || 'Something went wrong when fetching classes');
      }
    };
    FetchClasses();
  }, []);

  const verifyParent = async () => {
    try {
      toast.info('Verifying parent...');
      const res = await axios.get(`https://schoolapi-qrlm.onrender.com/parent/${parent}`, authHeader);
      setParentDetails(res.data);
      toast.dismiss();
      toast.success('Parent verified successfully');
    } catch (error) {
      setParentDetails(null);
      toast.dismiss();
      toast.error(error.response?.data?.message || 'Something went wrong when verifying parent');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentData = new FormData();
    studentData.append('name', name);
    studentData.append('dateOfBirth', dateOfBirth);
    studentData.append('admissionNumber', admissionNumber);
    studentData.append('gender', gender);
    studentData.append('classroomID', selectedClassId);
    studentData.append('parentNationalId', parent);

    if (photo) studentData.append('photo', photo);


    for (let [key, value] of studentData.entries()) {
  console.log(key, value);
}

    try {
      toast.info("Adding student...");
      await axios.post("https://schoolapi-qrlm.onrender.com/student/addStudent", studentData, {
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
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Student Name"
            required
            className="form-control mb-2"
          />
        </div>

        <div>
          <input
            type="text"
            value={admissionNumber}
            onChange={(e) => setAdmissionNumber(e.target.value)}
            placeholder="Admission Number"
            required
            className="form-control mb-2"
          />
        </div>

        <div>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="form-control mb-2"
            required
          />
        </div>

        <div>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="form-control mb-2"
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <div>
          <select
            className="form-select mb-2"
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
          >
            <option value="">Select Classroom</option>
            {classroom.map((c) => (
              <option key={c._id} value={c._id}>
                {`${c.name}, ${c.gradeLevel}, ${c.classYear}`}
              </option>
            ))}
          </select>
        </div>

        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={parent}
            onChange={(e) => setParent(e.target.value)}
            placeholder="Parent ID"
            required
            className="form-control mb-2"
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
              pointerEvents: 'auto'
            }}
            title="Verify Parent"
          ></i>
        </div>

        <div>
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="form-control mb-2"
            accept="image/*"
          />
        </div>

        <button className="btn btn-success" type="submit">
          Add Student
        </button>
      </form>

      {parentDetails && (
        <div className="alert alert-info mt-3">
          <strong>Parent Name:</strong> {parentDetails.name} <br />
          <strong>Email:</strong> {parentDetails.email}
        </div>
      )}
    </div>
  );
};

export default StudentAdd;
