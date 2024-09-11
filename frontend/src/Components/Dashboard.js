import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../App.css'
import AdminHome from './AdminPortal/AdminHome';
import UserHeader from './UserPortal/UserHeader';
import AdminSidebar from './AdminPortal/AdminSidebar';
import AdminUserList from './AdminPortal/AdminUserList';
import AdminVendorList from './AdminPortal/AdminVendorList';
import AdminOrganizations from './AdminPortal/AdminOrganizations';
import AdminServices from './AdminPortal/AdminServices';
import UserSidebar from './UserPortal/UserSidebar';
import VendorList from './UserPortal/VendorList';
import Organizations from './UserPortal/Organizations';
import Services from './UserPortal/Services';
import './AdminPortal/AdminVendorList.css'
import UserHome from './UserPortal/UserHome';
import AdminHeader from './AdminPortal/AdminHeader';

function Dashboard({ user , setUser}) {

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // console.log('User:', user);

  if (!user || !user.role) {
    return <div>Loading...</div>; // or a better fallback like a spinner
  }

  // Custom 404 Page component
  const NotFound = () => {
    return (
      <div className="not-found">
        <h2>404 Error: Page Not Found</h2>
        <p>Sorry, the page you're looking for does not exist.</p>
      </div>
    );
  };

  return (
    <div className='dashboard'>       
    {user.role === 'admin' ? (
        <div>
             <div className='Admin-div'>
                
                <Router>
                     <>
                     <div className='head' ><AdminHeader user={user} handleLogout={handleLogout} />  </div>
                     <div className='sidebar'><AdminSidebar/></div>

                    <Routes>
                    
                    <Route path="/" 
                    element={  <AdminHome/> } />
                  

                    <Route path="/Vendors" 
                    element={<div className='main-content'>  
                      <AdminVendorList/>
                    </div>} />
                    
                    <Route path="/Organizations" 
                    element={<div className='main-content'>  
                    <AdminOrganizations/>
                   </div>} />

                    <Route path="/Services"
                     element={<div className='main-content'> 
                     <AdminServices/>
                    </div>} />

                    <Route path="/Users"
                     element={<div className='main-content'> 
                     <AdminUserList/>
                    </div>} />

                    <Route path="*" element={<div className='main-content'> 
                      <NotFound />
                    </div>} />
                    </Routes>

                    </>
                  </Router>

             </div>

          </div>
                    ) : (

                    <div>
                    <Router>
                    <>
                    <div className='head' ><UserHeader user={user} handleLogout={handleLogout}/> </div>
                    <div className='sidebar'><UserSidebar/></div>


                    <Routes>

                    <Route path="/" 
                    element={  <UserHome/> } /> 

                    <Route path="/Vendors" 
                    element={<div className='main-content'>  
                      <VendorList/>
                    </div>} />

                    <Route path="/Organizations" 
                    element={<div className='main-content'>  
                    <Organizations/>
                   </div>} />

                    <Route path="/Services"
                     element={<div className='main-content'> 
                     <Services/>
                    </div>} />

                    <Route path="*" element={<div className='main-content'> 
                      <NotFound />
                    </div>} />

                    </Routes>
                    </>
                    </Router>
                    </div>
                    )}
  </div>



);
}

export default Dashboard;
