import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

type Props = {};

const CreateCrop: React.FC<Props> = () => {
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
    <h1>Create Crop</h1>
  </>;
};

export default CreateCrop;