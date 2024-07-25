import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Layout.css'


const AddStudentForm = () => {
  const [username, setUsername] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Fetch the list of departments from your API
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/departments'); // Adjust the URL to your API endpoint
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleDepartmentIdChange = (e) => {
    setDepartmentId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/student', {
        username: username,
        department_id: parseInt(departmentId) // Assuming departmentId is a number
      });
      console.log('Student created:', response.data);
      // Optionally, you can reset the form fields after successful submission
      setUsername('');
      setDepartmentId('');
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  return (
    <>
   


    <div className='form-conatiner'>
      <h2 style={{ textAlign: 'center' }}>Add New Student</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder='Username'
          value={username}
          onChange={handleUsernameChange}
          required
          />
        <br /><br />
        <label htmlFor="departmentId" style={{ textAlign: 'center' }}>Department</label>
        <select
          id="departmentId"
          value={departmentId}
          onChange={handleDepartmentIdChange}
          required
          >
          <option value="" disabled>Select Department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
        <br /><br />
        <button type="submit">Create Student</button>
      </form>
    </div>



    
          </>
  );
};

export default AddStudentForm;


































// import React, { useState } from 'react';
// import axios from 'axios';






// const AddStudentForm = () => {
//   const [username, setUsername] = useState('');
//   const [departmentId, setDepartmentId] = useState('');

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//   };

//   const handleDepartmentIdChange = (e) => {
//     setDepartmentId(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await axios.post('http://localhost:8000/student', {
//         username: username,
//         department_id: parseInt(departmentId) // Assuming departmentId is a number
//       });
//       console.log('Student created:', response.data);
//       // Optionally, you can reset the form fields after successful submission
//       setUsername('');
//       setDepartmentId('');
//     } catch (error) {
//       console.error('Error creating student:', error);
//     }
//   };

//   return (
//     <div >
//       <h2 style={{textAlign:"center"}}>Add New Student</h2>
//       <br />
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="username"></label>
//         <input
//           type="text"
//           id="username"
//           placeholder='Username'
//           value={username}
//           onChange={handleUsernameChange}
//           required
//         />
//         <br /><br/>
//         <label htmlFor="departmentId" style={{textAlign:'center'}}></label>
//         <input
//           type="text"
//           id="departmentId"
//           placeholder='Department Id'
//           value={departmentId}
//           onChange={handleDepartmentIdChange}
//           required
//         />
//         <br /> <br />
//         <button type="submit" >Create Student</button>
//       </form>
//     </div>
//   );
// };

// export default AddStudentForm;
