import './App.css';
import About from './Components/About';
import Navbar from './Components/Navbar';
import StudentComponent from './Components/StudentComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Services from './Components/Services';
import Organizations from './Components/Organizations';
import AddStudent from './Components/AddStudent';
import './Components/Layout.css';
import Sidebar from './Components/Sidebar';
import DeleteStudent from './Components/DeleteStudent';
import StudentDetails from './Components/StudentDetails';
import Login from './Components/Login';



 function App() {
   return (

    <Router>
       <>
         <Navbar />
         <div className='sidebar'><Sidebar/></div>
         <Routes>
           <Route path="/" element={<Login />} />
           <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
           <Route path="/StudentComponent" element={<StudentComponent />} />
           <Route path="/StudentDetails" element={<StudentDetails />} />
           <Route path="/Organizations" element={<Organizations />} />
           <Route path="/Services" element={<Services />} />
           <Route path="/AddStudent" element={ <div className="form-container">
        <AddStudent />
      </div>} />
           <Route path="/DeleteStudent" element={ <div className="form-container">
        <DeleteStudent />
      </div>} />

         </Routes>
       </>
     </Router>
   );
 }

 export default App;












// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

//  function App() {
//   const [students, setStudents] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [selectedStudentId, setSelectedStudentId] = useState('');
//   const [selectedCourseId, setSelectedCourseId] = useState('');
//   const [marksToUpdate, setMarksToUpdate] = useState('');

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/students');
//         setStudents(response.data);
//       } catch (error) {
//         console.error('Error fetching students:', error);
//       }
//     };

//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/courses');
//         setCourses(response.data);
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//       }
//     };

//     fetchStudents();
//     fetchCourses();
//   }, []);

//   const handleUpdateMarks = async () => {
//     try {
//         const response = await axios.put(`http://localhost:8000/marks/${selectedCourseId}/${selectedStudentId}/${marksToUpdate}`);
//         console.log('Update marks response:', response.data);

//         // Handle UI update
//         // Update courses state or UI as needed
//     } catch (error) {
//         console.error('Error updating marks:', error);
//     }
// };
  

//   return (
    // <div>
    //   <div>
    //     <h1>Students List</h1>
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>ID</th>
    //           <th>Username</th>
    //           <th>Department</th>
    //           <th>Courses</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {students.map(student => (
    //           <tr key={student.id}>
    //             <td>{student.id}</td>
    //             <td>{student.username}</td>
    //             <td>{student.department.name}</td>
    //             <td>
    //               <ul>
    //                 {student.courses.map(course => (
    //                   <li key={course.id}>{course.name} - Marks: {course.marks}</li>
    //                 ))}
    //               </ul>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    //   <div>
    //     <h2>All Courses</h2>
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>ID</th>
    //           <th>Name</th>
    //           <th>Student ID</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {courses.map(course => (
    //           <tr key={course.id}>
    //             <td>{course.id}</td>
    //             <td>{course.name}</td>
    //             <td>{course.student_details_id}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
//       <div>
//         <h2>Update Marks</h2>
//         <select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)}>
//           <option value="">Select Course</option>
//           {courses.map(course => (
//             <option key={course.id} value={course.id}>{course.name}</option>
//           ))}
//         </select>
//         <select value={selectedStudentId} onChange={(e) => setSelectedStudentId(e.target.value)}>
//           <option value="">Select Student</option>
//           {students.map(student => (
//             <option key={student.id} value={student.id}>{student.username}</option>
//           ))}
//         </select>
//         <input
//           type="number"
//           placeholder="Enter marks"
//           value={marksToUpdate}
//           onChange={(e) => setMarksToUpdate(e.target.value)}
//         />
//         <button onClick={handleUpdateMarks}>Update Marks</button>
//       </div>
//     </div>
//   );
// }

// export default App;


 


