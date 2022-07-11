import React, { useEffect, useState } from 'react';
import NutrientBatchTable from '../../components/nutrientBatchTable';
import { useAuth } from '../../hooks/useAuth';
import { getAllNutrientBatches } from '../../services/NutrientBatch.service';
import { INutrientBatch } from '../../types/INutrientBatch';
import { PageNames } from '../../types/PageNames.enum';
import Row from 'react-bootstrap/Row';
import { RoutePaths } from '../../types/RoutePaths.enum';
import TablePageHeader from '../../components/tablePageHeader';
import Unauthorized from '../../components/unauthorized';

type Props = {};

const NutrientBatches: React.FC<Props> = () => {
  const auth = useAuth();
  const [nutrientBatchData, setNutrientBatchData] = useState<INutrientBatch[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getAllNutrientBatches() as INutrientBatch[];
      setNutrientBatchData(data);
    })();
  }, []);

  return <>
    {auth && auth.user ?
      <>
        <TablePageHeader
          pageName={PageNames.NUTRIENT_BATCHES_PAGE}
          createPageRoute={RoutePaths.CREATE_CROP_ROUTE}
        />
        <Row>
          {nutrientBatchData &&
            <NutrientBatchTable nutrientBatches={nutrientBatchData}></NutrientBatchTable>
          }
        </Row>
      </>
    :
      <Unauthorized/>
    }
  </>;
};

export default NutrientBatches;