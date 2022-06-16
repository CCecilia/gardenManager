import { Link } from 'react-router-dom';
import React from 'react';

const Home: React.FC = () => {
  return (
    <>
      <div className='row'>
        <div className="col">
          <Link to={'/signIn'} className="btn btn-success btn-lg active" aria-current="page">Sign In</Link>
        </div>
        <div className="col">
          <Link to={'/signUp'} className="btn btn-success btn-lg active" aria-current="page">Sign Up</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
