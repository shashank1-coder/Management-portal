import React from 'react';

function AdminHeader({ user, handleLogout }) {


    return (
        <header className='header'>
            
            <div className='logo'>
 
                <img src='https://th.bing.com/th/id/OIP.vM_rDXLlZN3EQF1aTmKXdQHaHa?w=182&h=182&c=7&r=0&o=5&dpr=1.8&pid=1.7' alt='Logo' className='logo-img' />
                <span>Bitsilica</span>
            </div>

            <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder= "Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
            </form>


            <div className='login-section'>
            {user ? (            
                 <div className="dropdown">
                    <a href="/" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-person-circle me-2"></i>
                    <strong>admin</strong>
                    </a>

                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li><a className="dropdown-item"  href="/"><button>Profile </button></a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li className="dropdown-item" ><button onClick={handleLogout} style={{color:"red"}}>Sign out <i class="bi bi-box-arrow-right" ></i></button></li>
                    </ul>
                        </div>
                ) : (
                    <div className="dropdown">
                    <a href="/" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="bi bi-person-circle me-2"></i>
                      <strong>user</strong>
                    </a>

                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                      <li><a className="dropdown-item"  href="/"><button>Profile </button></a></li>
                      <li><hr className="dropdown-divider"/></li>
                      <li className="dropdown-item" ><button onClick={handleLogout} style={{color:"red"}}>Sign out <i class="bi bi-box-arrow-right" ></i></button></li>
                    </ul>
                  </div> 
                )}
            </div>


            
        </header>
    );
}

export default AdminHeader;