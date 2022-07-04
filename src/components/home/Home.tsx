import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { RoutePaths } from '../../types/RoutePaths.enum';

const Home: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth && auth.user) {
    navigate(RoutePaths.DASHBOARD_ROUTE);
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <Link
            to={RoutePaths.SIGNIN_ROUTE}
            className="btn btn-success btn-lg active"
            aria-current="page"
          >
            Sign In
          </Link>
        </div>
        <div className="col">
          <Link
            to={RoutePaths.SIGNUP_ROUTE}
            className="btn btn-success btn-lg active"
            aria-current="page"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
