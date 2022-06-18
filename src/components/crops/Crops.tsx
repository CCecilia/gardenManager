import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Crops: React.FC = () => {
  const auth = useAuth();

  if (!auth || !auth.user) {
    return null;
  }

  return (
    <>
      <div className="row">
        <h3>Crops</h3>
      </div>
    </>
  );
};

export default Crops;
