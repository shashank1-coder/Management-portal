import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../App.css'
import AdminHome from './Home';
import Header from './Header';
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

function Dashboard({ user , setUser}) {

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  
  // console.log('User:', user);

  if (!user || !user.role) {
    return <div>Loading...</div>; // or a better fallback like a spinner
  }

  

  return (
    <div className='dashboard'>       
    {user.role === 'admin' ? (
        <div>
             <div className='Admin-div'>
                
                <Router>
                     <>
                     <div className='head' ><Header user={user} handleLogout={handleLogout}/> </div>
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
                    element={  <AdminHome/> } /> 

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

                    </Routes>
                    </>
                    </Router>
                    </div>
                    )}
  </div>



);
}

export default Dashboard;








// import React, {  useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import '../App.css'
// import CreateUser from './AdminPortal/CreateUser';
// import AdminSidebar from './AdminPortal/AdminSidebar';
// import AdminVendorList from './AdminPortal/AdminVendorList';
// import AdminOrganizations from './AdminPortal/AdminOrganizations';
// import AdminServices from './AdminPortal/AdminServices';
// import UserSidebar from './UserPortal/UserSidebar';
// import VendorList from './UserPortal/VendorList';
// import Organizations from './UserPortal/Organizations';
// import Services from './UserPortal/Services';
// import  {Modal}  from './AdminPortal/Modal';
// import './AdminPortal/AdminVendorList.css'

// function Dashboard({ user }) {

//   const [modalOpen, setModalOpen] = useState(false);
  

  

//   return (
//     <div className='dashboard'>       
//     {user.role === 'admin' ? (
//         <div>
//              <div className='Admin-div'>
                
//                 <Router>
//                      <>
                     
//                      <div className='sidebar'><AdminSidebar/></div>
//                     <Routes>




//                     <Route path="/Home" 
//                     element={<div className='main-content'>  
//                       <AdminVendorList/>
//                       {modalOpen && (
//                         <Modal 
//                           closeModal={() => {
//                         setModalOpen(false);
//                           }}
//                         />
//                         )}
                    
//                     </div>} />
                  
    
                    
//                     <Route path="/Organizations" 
//                     element={<div className='main-content'>  
//                     <AdminOrganizations/>
//                     {modalOpen && (
//                     <Modal 
//                       closeModal={() => {
//                     setModalOpen(false);
//                       }}
//                     />
//                     )}
                                
//                   </div>} />

//                     <Route path="/Services"
//                      element={<div className='main-content'> 
//                      <AdminServices/>
//                      {modalOpen && (
//                         <Modal 
//                           closeModal={() => {
//                         setModalOpen(false);
//                           }}
//                         />
//                         )}
                    
//                     </div>} />

//                     <Route path="/CreateUser" element={<CreateUser />} />

//                     </Routes>
//                     </>
//                     </Router>
//                     </div>

//                     </div>
//                     ) : (
//                     <div>
//                     <Router>
//                     <>
//                     <div className='sidebar'><UserSidebar/></div>
//                     <Routes>
//                     <Route path="/Home" element={<VendorList />} />
//                     <Route path="/Organizations" element={<Organizations />} />
//                     <Route path="/Services" element={<Services />} />
//                     </Routes>
//                     </>
//                     </Router>
//                     </div>
//                     )}
//  </div>



// );
// }

// export default Dashboard;






// import React, { useState } from 'react';
// import VendorList from './VendorList';
// import VendorForm from './VendorForm';

// const Dashboard = () => {
//     const [selectedVendor, setSelectedVendor] = useState(null);

//     const handleSave = () => {
//         setSelectedVendor(null);  // Reset selected vendor after save
//     };

//     return (
//         <div className='main-content'>
//             <h1>Vendor Dashboard</h1>
//             <VendorList setSelectedVendor={setSelectedVendor} />
//             <h2>{selectedVendor ? 'Edit Vendor' : 'Add Vendor'}</h2>
//             <VendorForm selectedVendor={selectedVendor} onSave={handleSave} />
//         </div>
//     );
// };

// export default Dashboard;


// import React, {  useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import '../App.css'
// import CreateUser from './AdminPortal/CreateUser';
// import AdminSidebar from './AdminPortal/AdminSidebar';
// import AdminVendorList from './AdminPortal/AdminVendorList';
// import AdminOrganizations from './AdminPortal/AdminOrganizations';
// import AdminServices from './AdminPortal/AdminServices';
// // import AdminHeader from './AdminPortal/AdminHeader';


// import UserSidebar from './UserPortal/UserSidebar';
// import VendorList from './UserPortal/VendorList';
// import Organizations from './UserPortal/Organizations';
// import Services from './UserPortal/Services';
// import  {Modal}  from './AdminPortal/Modal';
// // import Header from './UserPortal/Header';












// function Dashboard({ user }) {

//     const [modalOpen, setModalOpen] = useState(false);
//     const [rows, setRows] = useState([
//       {
//         page: "Home",
//         description: "This is the main page of the website",
//         status: "live",
//       },
//       {
//         page: "About Us",
//         description: "This page has details about the company",
//         status: "draft",
//       },
//       {
//         page: "Pricing",
//         description: "Prices for different subscriptions",
//         status: "error",
//       },
//     ]);
//     const [rowToEdit, setRowToEdit] = useState(null);
  
//     const handleDeleteRow = (targetIndex) => {
//       setRows(rows.filter((_, idx) => idx !== targetIndex));
//     };
  
//     const handleEditRow = (idx) => {
//       setRowToEdit(idx);
  
//       setModalOpen(true);
//     };
  
//     const handleSubmit = (newRow) => {
//       rowToEdit === null
//         ? setRows([...rows, newRow])
//         : setRows(
//             rows.map((currRow, idx) => {
//               if (idx !== rowToEdit) return currRow;
  
//               return newRow;
//             })
//           );
//     };

//     return (
//         <div className='dashboard'>       
//         {user.role === 'admin' ? (
//             <div>
//                  <div className='Admin-div'>
                    
//                     <Router>
//                          <>
                         
//                          <div className='sidebar'><AdminSidebar/></div>
//                         <Routes>
//                         <Route path="/Home" element={   <div>
//                                 <AdminVendorList rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
//                                 <button onClick={() => setModalOpen(true)} className="btn">
//                                     Add
//                                 </button>
//                                 {modalOpen && (
//                                     <Modal
//                                     closeModal={() => {
//                                         setModalOpen(false);
//                                         setRowToEdit(null);
//                                     }}
//                                     onSubmit={handleSubmit}
//                                     defaultValue={rowToEdit !== null && rows[rowToEdit]}
//                                     />
//                                 )}
//                                 </div>   
//                             }/>          
                        

//                         <Route path="/Organizations" element={<AdminOrganizations />} />
//                         <Route path="/Services" element={<AdminServices />} />
//                         <Route path="/CreateUser" element={<CreateUser />} />

//                         </Routes>
//                     </>
//                     </Router>
//                 </div>

//             </div>
//         ) : (
//             <div>
//                <Router>
//                          <>
//                          {/* <div className='header'><Header/></div>     */}
//                          <div className='sidebar'><UserSidebar/></div>
//                         <Routes>
//                         <Route path="/Home" element={<VendorList />} />
//                         <Route path="/Organizations" element={<Organizations />} />
//                         <Route path="/Services" element={<Services />} />
//                         </Routes>
//                     </>
//                     </Router>
//             </div>
//         )}
//     </div>

       
//     );
// }

// export default Dashboard;