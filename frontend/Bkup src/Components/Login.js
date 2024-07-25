// import React, { useState } from 'react';
// import './Login.css';

// const Login = () => {
//   const [loginType, setLoginType] = useState('');

//   const handleLoginType = (type) => {
//     setLoginType(type);
//   };

//   return (
//       <div className="container">
//         <h1>Login</h1>
//       <div className="login-container">
//         <button onClick={() => handleLoginType('Student')} className="login-btn">Student Login</button>
//         <button onClick={() => handleLoginType('Admin')} className="login-btn">Admin Login</button>
//       </div>
//       {loginType && (
//         <form className="login-form">
//           <h2>{loginType} Login</h2>
//           <label htmlFor="username">Username</label>
//           <input 
//             type="text" 
//             id="username" 
//             name="username" 
//             pattern="[A-Za-z0-9]+" 
//             title="Username can only contain letters and numbers." 
//             required 
//           />
//           <label htmlFor="password">Password</label>
//           <input 
//             type="password" 
//             id="password" 
//             name="password" 
//             required 
//           />
//           <button type="submit">Login</button>
//           <a href="/" id="createAccountLink">Create a New Account</a>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password) {
      setError('Username and password are required');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const formDetails = new URLSearchParams();
    formDetails.append('username', username);
    formDetails.append('password', password);

    try {
      const response = await fetch('http://localhost:8000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDetails,
      });

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        navigate('/protected');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Authentication failed!');
      }
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
