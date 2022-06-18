import './NavBar.scss';

import { Link } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';

type Props = {};

const NavBar: React.FC<Props> = () => {
  const auth = useAuth();
  let authorizedLinks = false;

  if (auth && auth.user) {
    authorizedLinks = true;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light  fixed-top">
      <Link to={'/home'} className="nav-text-main">
        GardenManager
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className=" navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to={'/home'} className="nav-link">
              <span className="sr-only">Home</span>
            </Link>
          </li>
          {authorizedLinks ? (
            <>
              <li className="nav-item">
                <Link to={'/user'} className="nav-link">
                  <span className="sr-only">User</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/dashboard'} className="nav-link">
                  <span className="sr-only">DashBoard</span>
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={auth!.signOut}>
                  <span className="sr-only">LogOut</span>
                </a>
              </li>
              <li className="nav-item">
                <form className="form-inline my-2 my-lg-0">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to={'/login'} className="nav-link">
                  <span className="sr-only">Login</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/register'} className="nav-link">
                  <span className="sr-only">Sign Up</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
