import { Link } from "react-router-dom";



function Navbar() {
    return(
<nav className="navbar fixed-top" style={{  padding: '10px', position: 'fixed', width: '100%', zIndex: '1000'}}>
<div className="container-fluid" >
<Link className="navbar-brand" to="/" style={{fontWeight:"bold", color:"white"}} >BITSILICA UNIVERSITY </Link>
<form className="d-flex" role="search">
<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
<button className="btn btn-outline-success" type="submit">Search</button>
</form>
<button className="navbar-toggler1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
<span className="navbar-toggler-icon"></span>
</button>
<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
<div className="offcanvas-header">
  <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Contents</h5>
  <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
</div>
<div className="offcanvas-body">
  <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
  <li className="nav-item-1">
      <Link className="nav-link active" aria-current="page" to="/">Home</Link>
    </li> 
    <li className="nav-item-2">
      <Link className="nav-link" to="/StudentComponent">Students</Link>
    </li>       
    <li className="nav-item-3">
      <Link className="nav-link" to="/about">About</Link>
    </li>       
    <li className="nav-item-4">
      <Link className="nav-link" to="/ContactUS">ContactUS</Link>
    </li>                   
  </ul>        
</div>
</div>
</div>
</nav>

);
}

export default Navbar;







