// import React, { useState, useEffect } from 'react';
// import axios from 'axios';



// function StudentComponent() {
//   const [students, setStudents] = useState([]);
//   // const [selectedStudentId, setSelectedStudentId] = useState(null);

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


//     return(
      
//       <div className='main-content'>
//         <div>
//       <h1>Students List</h1>
//       <br></br>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Username</th>
//             <th>Department</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student, studentIndex) => (
//             <tr key={student.id || studentIndex}>
//               <td>{student.student_id}</td>
//               <td>{student.username}</td>
//               <td>{student.department.name}</td>
             
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </div>
       
 
          
//   );
// }

// export default StudentComponent;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Layout.css'; // Import the CSS file for styling

function StudentComponent() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  // Handler for search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handler for search button click
  const handleSearchClick = () => {
    // Perform search action here if needed
  };

  // Filter students based on the search query
  const filteredStudents = students.filter((student) =>
    student.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='main-content'>

      <div className='header'>
        <h1>Students List</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
            />
          <button onClick={handleSearchClick} className="search-button">Search</button>
        </div>
      </div>
      <div className='std-body'>
      <div className='table-data'>

      <table>
        <thead>
          <tr>
            <th style={{padding:"18px"}}>ID</th>
            <th style={{padding:"15px"}}>Username</th>
            <th style={{padding:"15px"}}>Department</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, studentIndex) => (
            <tr key={student.id || studentIndex}>
              <td style={{textAlign:"center"}}>{student.student_id}</td>
              <td>{student.username}</td>
              <td>{student.department.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
          </div>
          </div>
    </div>
  );
}

export default StudentComponent;

