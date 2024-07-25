import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllCourses() {

const [courses, setCourses] = useState([]);


useEffect(() => {
const fetchCourses = async () => {
        try {
          const response = await axios.get('http:localhost:8000/courses');
          setCourses(response.data);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };
      fetchCourses();
    }
);
 

return(
<>
    <div>
             <h2>All Courses</h2>
             <table>
               <thead>
                 <tr>
                   <th>ID</th>
                   <th>Name</th>
                   <th>Student ID</th>
                 </tr>
               </thead>
               <tbody>
                 {courses.map(course => (
                      <tr key={course.id}>
                        <td>{course.id}</td>
                        <td>{course.name}</td>
                        <td>{course.student_details_id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
   
</>




);
}

export default AllCourses;