// src/Components/Sidebar.js
// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link } from 'react-router-dom';

// const Sidebar = () => {
//   return (
//     <div className="d" >  {/*<div className="d-flex" ></div> */}
//       <div className="bg-dark border-right" id="sidebar-wrapper">
  
//         <div className='side-head' style={{color:"white", fontFamily:"Arial, Verdana, sans-serif",  padding:"10px 16px", backgroundColor: "#1f2c38", fontSize:"25px"}}>Dashboard</div>
        
//         <div className="list-group list-group-flush" >
//         <Link to="/Createuser" className="list-group-item list-group-item-action ">Create User </Link>
//           <Link to="/Home" className="list-group-item list-group-item-action ">Vendor List </Link>
//           <Link to="/Organizations" className="list-group-item list-group-item-action ">Organizations</Link>
//           <Link to="/Services" className="list-group-item list-group-item-action ">Services</Link>
//         </div>
//       </div>
      
//     </div>
//   );
// };

// export default Sidebar;




import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{height:"100%"}}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        {/* <i className="bi bi-house-door-fill me-2" width="40" height="32"></i> */}
        <span className="fs-3">Dashboard</span>
      </a>
      <br />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
        <Link to="/" className="nav-link text-white" >
            <i className="bi bi-house-fill me-2" width="16" height="16" style={{lineHeight:"2"}}></i>
            Home
          </Link>
        </li>
        <li>
        <Link to="/Vendors" className="nav-link text-white">
            <i className="bi bi-people-fill me-2" width="16" height="16" style={{lineHeight:"2"}}></i>
            Vendors
            </Link>
        </li>
        <li>
        <Link to="/Services" className="nav-link text-white">
            <i className="bi bi-card-checklist me-2" width="16" height="16" style={{lineHeight:"2"}}></i>
            Services
            </Link>
        </li>
        <li>
        <Link to="/Organizations" className="nav-link text-white">
            <i className="bi bi-building me-2" width="16" height="16" style={{lineHeight:"2"}}></i>
            Organization
            </Link>
        </li>
        <li>
        <Link to="/Users" className="nav-link text-white">
            <i className="bi bi-person me-2" width="16" height="16" style={{lineHeight:"2"}}></i>
             Users
          </Link>

        </li>
      </ul>
    </div>
    
  );
};

export default AdminSidebar;


// className="nav-link active" aria-current="page"