import './SideBar.scss';

import { faCoffee, faTree } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';

type Props = {}

const SideBar: React.FC<Props> = () => {
  const Auth = useAuth();

  if (!Auth?.user) {
    return null;
  }

  return (
    <div className="col-md-12">
      <div className="d-flex flex-column flex-shrink-0 bg-light side-bar-small-width">
        <a href="/" className="d-block p-3 link-dark text-decoration-none" title="Icon-only" data-bs-toggle="tooltip" data-bs-placement="right">
          <FontAwesomeIcon icon={faTree} />
          <span className="visually-hidden">Icon-only</span>
        </a>
        <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
          <li className="nav-item">
            <a href="#" className="nav-link active py-3 border-bottom rounded-0" aria-current="page" title="Home" data-bs-toggle="tooltip" data-bs-placement="right">
            <FontAwesomeIcon icon={faCoffee} />
            </a>
          </li>
          <li>
            <a href="#" className="nav-link py-3 border-bottom rounded-0" title="Dashboard" data-bs-toggle="tooltip" data-bs-placement="right">
            <FontAwesomeIcon icon={faCoffee} />
            </a>
          </li>
          <li>
            <a href="#" className="nav-link py-3 border-bottom rounded-0" title="Orders" data-bs-toggle="tooltip" data-bs-placement="right">
              <FontAwesomeIcon icon={faCoffee} />
            </a>
          </li>
          <li>
            <a href="#" className="nav-link py-3 border-bottom rounded-0" title="Products" data-bs-toggle="tooltip" data-bs-placement="right">
              <FontAwesomeIcon icon={faCoffee} />
            </a>
          </li>
          <li>
            <a href="#" className="nav-link py-3 border-bottom rounded-0" title="Customers" data-bs-toggle="tooltip" data-bs-placement="right">
              <FontAwesomeIcon icon={faCoffee} />
            </a>
          </li>
        </ul>
        <div className="dropdown border-top">
          <a href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="24" height="24" className="rounded-circle"></img>
          </a>
          <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
            <li><a className="dropdown-item" href="#">New project...</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider"></hr></li>
            <li><a className="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default SideBar;
