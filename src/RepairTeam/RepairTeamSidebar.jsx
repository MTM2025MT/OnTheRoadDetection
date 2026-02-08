import React from 'react'
import { Link } from 'react-router-dom';

  function RepairTeamSidebar() {

 return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        
        <ul style={{display:'flex',justifyContent:'space-around',alignItems:'center',width:'30%'}}>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">list</Link>
          </li> 
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="#">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="#">Home</Link>
          </li>
        </ul>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="offcanvas" 
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div 
          className="offcanvas offcanvas-start text-bg-dark" 
          tabIndex="-1" 
          id="offcanvasDarkNavbar" 
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              Dark offcanvas
            </h5>

            <button 
              type="button" 
              className="btn-close btn-close-white" 
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link active" to="/detiles">Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" >Link</Link>
              </li>

              {/* <li className="nav-item dropdown">
                <Link 
                  className="nav-link dropdown-toggle" 
                  to="#" 
                  role="button" 
                  data-bs-toggle="dropdown"
                >
                  Dropdown
                </Link>

                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><Link className="dropdown-item" to="#">Action</Link></li>
                  <li><Link className="dropdown-item" to="#">Another action</Link></li>

                  <li><hr className="dropdown-divider" /></li>

                  <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                </ul>
              </li> */}
            </ul>

            <form className="d-flex mt-3" role="search">
              <input 
                className="form-control me-2" 
                type="search"
                placeholder="Search"
              />
              <button className="btn btn-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default  RepairTeamSidebar ;
