// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Layout.css';

// function StudentDetails() {
//   const [students, setStudents] = useState([]);
//   const [inputStudentId, setInputStudentId] = useState('');
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [selectedCourseId, setSelectedCourseId] = useState('');
//   const [marksInput, setMarksInput] = useState('');
//   const [updateStatus, setUpdateStatus] = useState(null);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/students');
//         setStudents(response.data);
//       } catch (error) {
//         console.error('Error fetching students:', error);
//       }
//     };

//     fetchStudents();
//   }, []);

//   const handleInputChange = (event) => {
//     setInputStudentId(event.target.value);
//   };

//   const handleCourseChange = (event) => {
//     setSelectedCourseId(event.target.value);
//   };

//   const handleMarksChange = (event) => {
//     setMarksInput(event.target.value);
//   };

//   const handleSubmit = () => {
//     const studentId = parseInt(inputStudentId);
//     const student = students.find((student) => student.student_id === studentId);
//     setSelectedStudent(student || null);
//   };

//   const handleUpdateMarks = async () => {
//     const studentId = selectedStudent.student_id;
//     const marks = parseInt(marksInput);

//     try {
//       await axios.put(`http://localhost:8000/marks/${selectedCourseId}/${studentId}/${marks}`);
      
//       // Update the local state to reflect the new marks
//       setSelectedStudent(prevState => {
//         const updatedCourses = prevState.courses.map(course => 
//           course.id === parseInt(selectedCourseId) ? { ...course, marks } : course
//         );
//         return { ...prevState, courses: updatedCourses };
//       });

//       setUpdateStatus(`Marks updated for course ID ${selectedCourseId}`);
//     } catch (error) {
//       setUpdateStatus(`Error updating marks for course ID ${selectedCourseId}`);
//       console.error('Error updating marks:', error);
//     }
//   };

//   return (
//     <div className="main-content">
//       <h1>Student Details</h1>
//       <div>
//         <label htmlFor="student-input-id"></label>
//         <input
//           type="text"
//           id="student-input-id"
//           value={inputStudentId}
//           onChange={handleInputChange}
//           placeholder="Enter Student ID"
//         />
//         <button onClick={handleSubmit}>Submit</button>
//       </div>
//       <br />
//       {selectedStudent ? (
//         <div className="student-details">
//           <h2>Selected Student Details</h2>
//           <p><strong>ID:</strong> {selectedStudent.student_id}</p>
//           <p><strong>Username:</strong> {selectedStudent.username}</p>
//           <p><strong>Department:</strong> {selectedStudent.department.name}</p>
//           <h3>Courses</h3>
//           <ul>
//             {selectedStudent.courses.map((course) => (
//               <li key={course.id}>
//                 {course.name} - Marks: {course.marks}
//               </li>
//             ))}
//           </ul>
//           <div>
//             <select value={selectedCourseId} onChange={handleCourseChange}>
//               <option value="">Select Course</option>
//               {selectedStudent.courses.map((course) => (
//                 <option key={course.id} value={course.id}>
//                   {course.name}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="number"
//               value={marksInput}
//               onChange={handleMarksChange}
//               placeholder="Enter new marks"
//             />
//             <button onClick={handleUpdateMarks}>Update Marks</button>
//           </div>
//           {updateStatus && <p>{updateStatus}</p>}
//         </div>
//       ) : (
//         <p>Please enter a valid student ID and click Submit to see their details.</p>
//       )}
//     </div>
//   );
// }

// export default StudentDetails;











import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Layout.css';

function StudentDetails() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [inputStudentId, setInputStudentId] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [marksInput, setMarksInput] = useState('');
  const [updateStatus, setUpdateStatus] = useState(null);
  const [assignStatus, setAssignStatus] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchStudents();
    fetchCourses();
  }, []);

  const handleInputChange = (event) => {
    setInputStudentId(event.target.value);
  };

  const handleCourseChange = (event) => {
    setSelectedCourseId(event.target.value);
  };

  const handleMarksChange = (event) => {
    setMarksInput(event.target.value);
  };

  const handleSubmit = () => {
    const studentId = parseInt(inputStudentId);
    const student = students.find((student) => student.student_id === studentId);
    setSelectedStudent(student || null);
  };

  const handleUpdateMarks = async () => {
    const studentId = selectedStudent.student_id;
    const marks = parseInt(marksInput);

    try {
      await axios.put(`http://localhost:8000/marks/${selectedCourseId}/${studentId}/${marks}`);
      
      // Update the local state to reflect the new marks
      setSelectedStudent(prevState => {
        const updatedCourses = prevState.courses.map(course => 
          course.id === parseInt(selectedCourseId) ? { ...course, marks } : course
        );
        return { ...prevState, courses: updatedCourses };
      });

      setUpdateStatus(`Marks updated for course ID ${selectedCourseId}`);
    } catch (error) {
      setUpdateStatus(`Error updating marks for course ID ${selectedCourseId}`);
      console.error('Error updating marks:', error);
    }
  };

  const handleAssignCourse = async () => {
    const studentId = selectedStudent.student_id;
    const marks = parseInt(marksInput);

    try {
      await axios.post('http://localhost:8000/assign_course', {
        course_id: selectedCourseId,
        student_id: studentId,
        marks
      });

      // Fetch the updated student data
      const updatedStudentResponse = await axios.get(`http://localhost:8000/student/${studentId}`);
      setSelectedStudent(updatedStudentResponse.data);

      setAssignStatus(`Course ID ${selectedCourseId} assigned to student`);
    } catch (error) {
      setAssignStatus(`Error assigning course ID ${selectedCourseId}`);
      console.error('Error assigning course:', error);
    }
  };

  return (
    <div className="main-content">
      <h1>Student Details</h1>
      <div>
        <label htmlFor="student-input-id"></label>
        <input
          type="text"
          id="student-input-id"
          value={inputStudentId}
          onChange={handleInputChange}
          placeholder="Enter Student ID"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <br />
      {selectedStudent ? (
        <div className="student-details">
          <h2>Selected Student Details</h2>
          <p><strong>ID:</strong> {selectedStudent.student_id}</p>
          <p><strong>Username:</strong> {selectedStudent.username}</p>
          <p><strong>Department:</strong> {selectedStudent.department.name}</p>
          <h3>Courses</h3>
          <ul>
            {selectedStudent.courses.map((course) => (
              <li key={course.id}>
                {course.name} - Marks: {course.marks}
              </li>
            ))}
          </ul>
          <br/><br/>
          <div>
            <select value={selectedCourseId} onChange={handleCourseChange}>
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={marksInput}
              onChange={handleMarksChange}
              placeholder="Enter marks"
            />
            <button onClick={handleUpdateMarks}>Update Marks</button>
            <button onClick={handleAssignCourse}>Assign Course</button>
          </div>
          {updateStatus && <p>{updateStatus}</p>}
          {assignStatus && <p>{assignStatus}</p>}
        </div>
      ) : (
        <p>Please enter a valid student ID and click Submit to see their details.</p>
      )}
    </div>
  );
}

export default StudentDetails;








