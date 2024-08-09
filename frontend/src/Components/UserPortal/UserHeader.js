import React from 'react';

function UserHeader({ user, handleLogout }) {


    return (
        <header className='header'>
            
            <div className='logo'>
            {/* <button class="btn btn-light me-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
            <i class="bi bi-list"></i>
</button>

<div class="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="staticBackdropLabel">Offcanvas</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div>
      I will not close if you click outside of me.
    </div>
  </div>
</div> */}
                <img src='https://th.bing.com/th/id/OIP.vM_rDXLlZN3EQF1aTmKXdQHaHa?w=182&h=182&c=7&r=0&o=5&dpr=1.8&pid=1.7' alt='Logo' className='logo-img' />
                <span>Bitsilica</span>
            </div>

            {/* <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder= "Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}


            <div className='login-section'>
            {user ? (            
                 <div className="dropdown">
                    <a href="/" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-person-circle me-2"></i>
                    <strong>user</strong>
                    </a>

                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                    {/* <li><a className="dropdown-item"  href="/"><button>Profile </button></a></li>
                    <li><hr className="dropdown-divider"/></li> */}
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

export default UserHeader;