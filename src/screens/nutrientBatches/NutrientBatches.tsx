import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NutrientBatchTable from '../../components/nutrientBatchTable';
import { useAuth } from '../../hooks/useAuth';
import { getAllNutrientBatches } from '../../services/NutrientBatch.service';
import { INutrientBatch } from '../../types/INutrientBatch';
import { PageNames } from '../../types/PageNames.enum';
import { titleCase } from '../../utilities/Typography';

type Props = {};

const NutrientBatches: React.FC<Props> = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [nutrientBatchData, setNutrientBatchData] = useState<INutrientBatch[] | null>(null);

  useEffect(() => {
    (async () => {
      if (auth) {
        const [shouldRedirect, redirectRoute] = auth.shouldRedirect();

        if ( shouldRedirect && redirectRoute ) {
          navigate(redirectRoute);
        }
      }

      const data = await getAllNutrientBatches() as INutrientBatch[];
      setNutrientBatchData(data);
    })();
  }, []);

  return <>
    <h1>{titleCase(PageNames.NUTRIENT_BATCHES_PAGE)}</h1>
    {nutrientBatchData &&
      <NutrientBatchTable nutrientBatches={nutrientBatchData}></NutrientBatchTable>
    }
  </>;
};

export default NutrientBatches;