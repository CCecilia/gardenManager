import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Dashboard: React.FC = () => {
  const auth = useAuth();
  console.log(auth);

  if (auth && auth.user) {
    console.log(auth.user);
    return (
      <>
        <header className="jumbotron">
          <h3>
            <strong>{auth.user.email}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong> {auth.user.accessToken.substring(0, 20)} ...{' '}
          {auth.user.accessToken.substr(auth.user.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong> {auth.user.id}
        </p>
        <p>
          <strong>Email:</strong> {auth.user.email}
        </p>
      </>
    );
  }

  return null;
};

export default Dashboard;
