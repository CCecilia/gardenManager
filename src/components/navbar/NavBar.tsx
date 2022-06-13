import './NavBar.scss';

import * as AuthService from '../../services/Auth.service';

import React, {useEffect, useState} from 'react';

import { IUser } from '../../types/User.type';
import { Link } from 'react-router-dom';

type Props = {
}

const NavBar: React.FC<Props> = () => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between fixed-top">
      <Link to={'/home'} className="nav-text-main">GardenManager</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to={'/home'} className="nav-link">
              <span className="sr-only">Home</span>
            </Link>
          </li>
          {currentUser && (
            <li className="nav-item">
              <Link to={'/user'} className="nav-link">
                <span className="sr-only">User</span>
              </Link>
            </li>
          )}
          {currentUser ? (
            <>
              <li className="nav-item">
                <Link to={'/dashboard'} className="nav-link">
                  <span className="sr-only">{currentUser.email}</span>
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  <span className="sr-only">LogOut</span>
                </a>
              </li>
              <li className="nav-item">
                <form className="form-inline my-2 my-lg-0">
                  <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
              </li>
            </>
          ): (
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
