import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import React from 'react';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../hooks/useAuth';

type Props = {};

const SideBar: React.FC<Props> = () => {
  const auth = useAuth();

  if (!auth || !auth.user) {
    return null;
  }

  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to={'/dashboard'} className="nav-link active" aria-current="page">
              <FontAwesomeIcon icon={faCoffee} />
              &nbsp; Crops
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'/plants'} className="nav-link active" aria-current="page">
              <FontAwesomeIcon icon={faCoffee} />
              &nbsp; Plants
            </Link>
          </li>
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
          <span>Saved reports</span>
          <a className="link-secondary" href="#" aria-label="Add a new report">
            <FontAwesomeIcon icon={faCoffee} />
          </a>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <Link to={'/dashboard'} className="nav-link active" aria-current="page">
              <FontAwesomeIcon icon={faCoffee} />
              &nbsp; DashBoard
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'/dashboard'} className="nav-link active" aria-current="page">
              <FontAwesomeIcon icon={faCoffee} />
              &nbsp; DashBoard
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <FontAwesomeIcon icon={faCoffee} />
              &nbsp; Social engagement
            </a>
          </li>
          <li className="nav-item">
            <Link to={'/dashboard'} className="nav-link active" aria-current="page">
              <FontAwesomeIcon icon={faCoffee} />
              &nbsp; DashBoard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
