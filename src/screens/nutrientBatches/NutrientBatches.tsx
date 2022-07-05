import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { PageNames } from '../../types/PageNames.enum';
import { titleCase } from '../../utilities/Typography';

type Props = {};

const NutrientBatches: React.FC<Props> = () => {
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
    <h1>{ titleCase(PageNames.NUTRIENT_BATCHES_PAGE) }</h1>
  </>;
};

export default NutrientBatches;