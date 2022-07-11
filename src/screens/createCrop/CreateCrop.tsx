import React from 'react';
import Unauthorized from '../../components/unauthorized';
import { useAuth } from '../../hooks/useAuth';

type Props = {};

const CreateCrop: React.FC<Props> = () => {
  const auth = useAuth();

  return <>
    {auth && auth.user ?
      <h1>CreateCrop</h1>
    :
      <Unauthorized/>
    }
  </>;
};

export default CreateCrop;