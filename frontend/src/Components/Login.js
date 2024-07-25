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
        placeholder='ID'
        name="login"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type='text'
        placeholder='Password'
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


// import React, { useState } from 'react';
// import './Login.css'
// import img from '../bitsilica_logo.jpeg'

// const usersDB = [
//     { id: 'admin', password: 'admin123', role: 'admin' },
//     { id: 'user1', password: 'user123', role: 'user' },
// ];

// function Login({ setUser }) {
//     const [id, setId] = useState('');
//     const [password, setPassword] = useState('');

//     const handleLogin = () => {
//         const user = usersDB.find(user => user.id === id && user.password === password);
//         if (user) {
//             setUser(user);
//         } else {
//             alert('Invalid credentials');
//         }
//     };

//     return (
//         // <div className='login'>
//         //     <h2>Login</h2>
//         //     <input
//         //         type='text'
//         //         placeholder='ID'
//         //         value={id}
//         //         onChange={(e) => setId(e.target.value)}
//         //     />
//         //     <input
//         //         type='password'
//         //         placeholder='Password'
//         //         value={password}
//         //         onChange={(e) => setPassword(e.target.value)}
//         //     />
//         //     <button onClick={handleLogin}>Login</button>
//         // </div>

//     <div class="wrapper fadeInDown">
//         <div id="formContent">

//         <h3 class="active"> Login </h3>
//         {/* <h3 class="inactive underlineHover">Sign Up </h3> */}

//         <div class="fadeIn first">
//       <img src= {img} id="icon" alt="User Icon" />
//         </div>

//         <form>
//         {/* <h2>Login</h2> */}
//              <input
//                  type='text'
//                  id='login'
//                  className='fadeIn second'
//                  placeholder='ID'
//                  name="login"
//                  value={id}
//                  onChange={(e) => setId(e.target.value)}
//                  />
//             <input
//                 type='text'
//                 placeholder='Password'
//                 id="password" class="fadeIn third" 
//                 name="login"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                       />


//       <input type="submit" class="fadeIn fourth" value="Log In"  onClick={handleLogin}/>
//         </form>



//         </div>
    
//     </div>
    
//     );
// }

// export default Login;