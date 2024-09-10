import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{height:"100%"}}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-3">Dashboard</span>
      </a>
      <br />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/" className={`nav-link text-white ${location.pathname === '/' ? 'active' : ''}`}>
            <i className="bi bi-house-fill me-2" width="16" height="16" style={{lineHeight:"2"}}></i>
            Home
          </Link>
        </li>
        <li>
          <Link to="/Vendors" className={`nav-link text-white ${location.pathname === '/Vendors' ? 'active' : ''}`}>
            <i className="bi bi-people-fill me-2" width="16" height="16" style={{lineHeight:"2"}}></i>
            Vendors
          </Link>
        </li>
        <li>
          <Link to="/Services" className={`nav-link text-white ${location.pathname === '/Services' ? 'active' : ''}`}>
            <i className="bi bi-card-checklist me-2" width="16" height="16" style={{lineHeight:"2"}}></i>
            Services
          </Link>
        </li>
        <li>
          <Link to="/Organizations" className={`nav-link text-white ${location.pathname === '/Organizations' ? 'active' : ''}`}>
            <i className="bi bi-building me-2" width="16" height="16" style={{lineHeight:"2"}}></i>
            Organizations
          </Link>
        </li>
        <li>
          <Link to="/Users" className={`nav-link text-white ${location.pathname === '/Users' ? 'active' : ''}`}>
            <i className="bi bi-person me-2" width="16" height="16" style={{lineHeight:"2"}}></i>
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;