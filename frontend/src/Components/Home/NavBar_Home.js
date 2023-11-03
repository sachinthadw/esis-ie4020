import React from 'react'
import { Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
function NavBar_Home() {

  // let [user, setUser] = useState();

  // useEffect(() => {
  //     const user = JSON.parse(localStorage.getItem("user"));
  //     setUser(user);
  //     console.log(user);

  // }, []);
  return (
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" target="_blank" href="https://www.sliit.lk/">
          <img src="https://static.sliit.lk/wp-content/uploads/2017/12/sliit-web-logo.png" alt='logo' height="28" />
        </a>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">

          <Link to="/" className="navbar-item"> <i className="navbar-item fas fa-home"></i> Home </Link>
          <Link to="/all" className="navbar-item"><i className="navbar-item fa fa-film"></i>  All Movies </Link>
          {(localStorage.getItem('token')) && (
            <>
              <Link to="/mybookings" className="navbar-item"><i className="navbar-item fa fa-video-camera"></i> My Movies </Link>
              <Link to="/cart" className="navbar-item"><i className="navbar-item fa fa-cart-arrow-down"></i>My Cart </Link>
            </>
          )}
          {(localStorage.getItem('atoken')) && (
            <>
              <Link to="/dashboard" className="navbar-item"><i className="navbar-item fa fa-tachometer"></i> Dashboard </Link>
              <Link to="/allshow" className="navbar-item"><i className="navbar-item fa fa-ticket"></i> Shows </Link>
              <Link to="/allmovies" className="navbar-item"><i className="navbar-item fa fa-film"></i> Movies </Link>
              <Link to="/allhalls" className="navbar-item"><i className="navbar-item fa fa-video-camera"></i> Movies Halls </Link>
              <Link to="/users" className="navbar-item"><i className="navbar-item fa fa-user"></i> Users</Link>
              <Link to="/bookings" className="navbar-item"><i className="navbar-item fa fa-cart-arrow-down"></i>Booking </Link>
            </>
          )}
          <Link to="/qrread" className="navbar-item"> <i className="navbar-item fa fa-qrcode" aria-hidden="true"></i>QR Reader </Link>

        </div>

        <div className="navbar-end">

          {(localStorage.getItem('token') || localStorage.getItem('atoken')) && (
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                Menu
              </a>
              <div className="navbar-dropdown">

                {(localStorage.getItem('atoken')) && (<>
                  <Link to="/" className="navbar-item"> <i className="fa fa-user mr-2"></i>My Account </Link>
                </>
                )}
                {(localStorage.getItem('token')) && (<>
                  <Link to="/profile" className="navbar-item"> <i className="fa fa-user mr-2"></i>My Account </Link>
                </>
                )}

                <hr className="navbar-divider" />
                <a className="navbar-item" onClick={(e) => {
                  googleLogout()
                  localStorage.clear();
                  window.location.href = '/'
                }}>

                  <b> Sign Out </b>
                </a>
              </div>
            </div>
          )}



          <div className="navbar-item">
            <div className="buttons">

              {!(localStorage.getItem('token') || localStorage.getItem('atoken')) && (
                <>
                  {/* <Link to="/login"><button className="button is-success mr-3">Login</button></Link> */}
                  <GoogleLogin
                    onSuccess={credentialResponse => {
                      console.log(credentialResponse);
                      localStorage.setItem("token", "sasqww12")
                      window.location.href = '/all';
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />;

                  <Link to="/register"><button className="button is-danger">Register</button></Link>

                </>
              )}


            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar_Home