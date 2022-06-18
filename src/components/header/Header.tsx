import { Link } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';

type Props = {};

const Header: React.FC<Props> = () => {
  const auth = useAuth();
  let authorizedLinks = false;

  if (auth && auth.user) {
    authorizedLinks = true;
  }

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link to={authorizedLinks ? '/dashboard': '/home'} className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" aria-current="page">
        GardenManager
      </Link>
      {authorizedLinks &&
        <>
          <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <input className="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search"></input>
          <div className="navbar-nav">
            <div className="nav-item text-nowrap">
              <a className="nav-link px-3" onClick={auth!.signOut}>Sign out</a>
            </div>
          </div>
        </>
      }
    </header>
  );
};

export default Header;