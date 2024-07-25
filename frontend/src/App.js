import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      axios.get('http://localhost:8000/users/me', {
        headers: {
          Authorization: `Bearer ${userData.access_token}`
        }
      }).catch(() => {
        localStorage.removeItem('user');
        setUser(null);
      });
    }
  }, []);



  return (
    <div className='App'>
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <>
          <Dashboard user={user} setUser={setUser} />
        </>
      )}
    </div>
  );
}

export default App;








//  import './App.css';
//  import Navbar from './Components/Navbar';
//  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//  import Services from './Components/Services';
//  import Organizations from './Components/Organizations';
//  import Sidebar from './Components/Sidebar';
//  import VendorList from './Components/VendorList';
//  import React, { useState } from 'react';
//  import Header from './Components/Header';
//  import Login from './Components/Login';
//  import Dashboard from './Components/Dashboard';


//  function App() {

//  return (

//  <Router>
//        <>
//          <Navbar />
//          <div className='sidebar'><Sidebar/></div>
//          <Routes>

//            <Route path="/Home" element={<VendorList />} />
//            <Route path="/Organizations" element={<Organizations />} />
//            <Route path="/Services" element={<Services />} />
         
      

//          </Routes>
//        </>
//      </Router>


// );
// }
 


