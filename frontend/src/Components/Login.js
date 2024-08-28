import React, { useState } from 'react';
import './Login.css';
import img from '../bitsilica_logo.jpeg'

function Login({ setUser }) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault(); // Prevent form submission
      try {
        const response = await fetch('http://127.0.0.1:8000/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            username: id,
            password: password
          }),
        });
  
        if (!response.ok) {
          throw new Error('Invalid credentials');
        }
  
        const data = await response.json();
        // console.log('Login response:', data);
        localStorage.setItem('user', JSON.stringify(data)); // Save token, user data, and role
        setUser(data);
      } catch (error) {
        alert(error.message);
      }
    };
    
  return (

    <div class="wrapper fadeInDown">
         <div id="formContent">
         <h3 class="active"> Login </h3>
   
    <div class="fadeIn first">
     <img src= {img} id="icon" alt="User Icon" />
       </div>

   
    <form>
      <input
        type='text'
        id='login'
        className='fadeIn second'
        placeholder='Enter ID'
        name="login"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type='password'
        placeholder='Enter Password'
        id="password" class="fadeIn third" 
        name="login"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
    />
      <input type="submit" class="fadeIn fourth" value="Log In"  onClick={handleLogin}/>
      </form>
    </div>




    </div>
  );
}

export default Login;
