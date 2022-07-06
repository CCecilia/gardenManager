import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import React from 'react';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../hooks/useAuth';
import { RoutePaths } from '../../types/RoutePaths.enum';

type Props = {};

const SideBar: React.FC<Props> = () => {
  const auth = useAuth();

  if (!auth || !auth.user) {
    return null;
  }

  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
        <span>Analytics</span>
        <a className="link-secondary" href="#" aria-label="Add a new report">
          <FontAwesomeIcon icon={faCoffee} />
        </a>
      </h6>
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              to={RoutePaths.DASHBOARD_ROUTE}
              className="nav-link active"
              aria-current="page"
            >
              <FontAwesomeIcon icon={faCoffee} />
              &nbsp; DashBoard
            </Link>
          </li>
        </ul>
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
          <span>Garden Data</span>
          <a className="link-secondary" href="#" aria-label="Add a new report">
            <FontAwesomeIcon icon={faCoffee} />
          </a>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <Link
              to={RoutePaths.CROPS_ROUTE}
              className="nav-link active"
              aria-current="page"
            >
              <FontAwesomeIcon icon={faCoffee} />
              &nbsp; Crops
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={RoutePaths.PLANTS_ROUTE}
              className="nav-link active"
              aria-current="page"
            >
              <FontAwesomeIcon icon={faCoffee} />
              &nbsp; Plants
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={RoutePaths.NUTRIENT_BATCHES_ROUTE}
              className="nav-link active"
              aria-current="page"
            >
              <FontAwesomeIcon icon={faCoffee} />
              &nbsp; Nutrients
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
