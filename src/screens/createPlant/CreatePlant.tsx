import React from 'react';
import Unauthorized from '../../components/unauthorized';
import { useAuth } from '../../hooks/useAuth';

type Props = {};

const CreatePlant: React.FC<Props> = () => {
  const auth = useAuth();

  return <>
    {auth && auth.user ?
      <h1>CreatePlant</h1>
    :
      <Unauthorized/>
    }
  </>;
};

export default CreatePlant;