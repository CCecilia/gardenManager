import React from 'react';
import Unauthorized from '../../components/unauthorized';
import { useAuth } from '../../hooks/useAuth';

type Props = {};

const CreateNutrientBatch: React.FC<Props> = () => {
  const auth = useAuth();

  return <>
    {auth && auth.user ?
      <h1>CreateNutrientBatch</h1>
    :
      <Unauthorized/>
    }
  </>;
};

export default CreateNutrientBatch;