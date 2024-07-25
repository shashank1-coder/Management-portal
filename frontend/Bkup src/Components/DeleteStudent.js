import React, { useState } from 'react';
import axios from 'axios';
import './Layout.css';

const DeleteStudentForm = () => {
  const [inputStudentId, setInputStudentId] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' or 'error'

  const handleInputChange = (e) => {
    setInputStudentId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const studentId = parseInt(inputStudentId);
      // Check if inputStudentId is valid (not empty)
      if (!studentId) {
        setAlertMessage('Please enter a valid student ID.');
        setAlertType('error');
        return;
      }

      await axios.delete(`http://localhost:8000/student/${studentId}`); // Adjust the URL to your API endpoint
      setAlertMessage('Student deleted successfully.');
      setAlertType('success');
      // Optionally, you can reset the form field after successful deletion
      setInputStudentId('');
    } catch (error) {
      console.error('Error deleting student:', error);
      setAlertMessage('Error deleting student.');
      setAlertType('error');
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Delete Student</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="studentId" style={{ textAlign: 'center' }}>Enter Student ID</label>
        <input
          type="text"
          id="studentId"
          value={inputStudentId}
          onChange={handleInputChange}
          placeholder="Enter Student ID"
          required
        />
        <br /><br />
        <button type="submit">Delete Student</button>
      </form>
      {alertMessage && (
        <div className={`alert ${alertType === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default DeleteStudentForm;


















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Layout.css';

// const DeleteStudentForm = () => {
//   const [students, setStudents] = useState([]);
//   const [selectedStudentId, setSelectedStudentId] = useState('');

//   useEffect(() => {
//     // Fetch the list of students from your API
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/students'); // Adjust the URL to your API endpoint
//         setStudents(response.data);
//       } catch (error) {
//         console.error('Error fetching students:', error);
//       }
//     };

//     fetchStudents();
//   }, []);

//   const handleStudentChange = (e) => {
//     setSelectedStudentId(parseInt(e.target.value));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Check if selectedStudentId is valid (not empty)
//       if (!selectedStudentId) {
//         console.error('No student selected.');
//         return;
//       }

//       await axios.delete(`http://localhost:8000/student/${selectedStudentId}`); // Adjust the URL to your API endpoint
//       console.log('Student deleted');
//       // Optionally, you can reset the form field after successful deletion
//       setSelectedStudentId('');
//       // Optionally, you can refetch the students list to update the UI
//       const response = await axios.get('http://localhost:8000/students');
//       setStudents(response.data);
//     } catch (error) {
//       console.error('Error deleting student:', error);
//     }
//   };


//   return (
//     <div >
//     <h2 style={{ textAlign: 'center' }}>Delete Student</h2>
//       <br />
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="studentId" style={{ textAlign: 'center' }}>Select Student</label>
//         <select
//           id="studentId"
//           value={selectedStudentId}
//           onChange={handleStudentChange}
//           required
//         >
//           <option value="" disabled>Select Student</option>
//           {students.map((student) => (
//             <option key={student.student_id} value={student.student_id}>
//               {student.username} (ID: {student.student_id})
//             </option>
//           ))}
//         </select>
//         <br /><br />
//         <button type="submit">Delete Student</button>
//       </form>
//     </div>
//   );
// };

// export default DeleteStudentForm;
