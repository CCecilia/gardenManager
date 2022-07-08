import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

type Props = {};

const CreateNutrientBatch: React.FC<Props> = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      const [shouldRedirect, redirectRoute] = auth.shouldRedirect();

      if ( shouldRedirect && redirectRoute ) {
        navigate(redirectRoute);
      }
    }
  });

  return <>
    <h1>Create Nutrient Batch</h1>
  </>;
};

export default CreateNutrientBatch;