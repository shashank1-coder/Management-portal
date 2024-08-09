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