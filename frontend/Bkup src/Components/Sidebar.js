// src/Components/Sidebar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="d" >  {/*<div className="d-flex" ></div> */}
      <div className="bg-dark border-right" id="sidebar-wrapper">
  
        <div className='side-head' style={{color:"white", fontFamily:"Arial, Verdana, sans-serif",  padding:"10px 16px", backgroundColor: "#1f2c38", fontSize:"25px"}}>Contents</div>
        
        <div className="list-group list-group-flush" >
          <Link to="/AddStudent" className="list-group-item list-group-item-action ">Create Student</Link>
          <Link to="/StudentComponent" className="list-group-item list-group-item-action ">Student List</Link>
          <Link to="/StudentDetails" className="list-group-item list-group-item-action ">Student Dashboard</Link>
          <Link to="/Organizations" className="list-group-item list-group-item-action ">Organizations</Link>
          <Link to="/Services" className="list-group-item list-group-item-action ">Services</Link>
          <Link to="/DeleteStudent" className="list-group-item list-group-item-action ">Delete Student</Link>
        </div>
      </div>
      
    </div>
  );
};

export default Sidebar;
