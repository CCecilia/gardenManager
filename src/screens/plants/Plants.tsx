import React, { useEffect, useState } from 'react';

import { IPlant } from '../../types/Plant.interface';
import { getPlantData } from '../../services/Plant.service';
import { PageNames } from '../../types/PageNames.enum';
import { RoutePaths } from '../../types/RoutePaths.enum';
import PlantsTable from '../../components/plantsTable';
import { useAuth } from '../../hooks/useAuth';
import Row from 'react-bootstrap/Row';
import TablePageHeader from '../../components/tablePageHeader';
import Unauthorized from '../../components/unauthorized';

type Props = {};

const Plants: React.FC<Props> = () => {
  const auth = useAuth();
  const [plantData, setPlantData] = useState<IPlant[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getPlantData();
      setPlantData(data);
    })();
  }, []);

  return (<Row style={{ paddingLeft: '2rem' }}>
    {auth && auth.user ?
      <Row>
        <TablePageHeader
          pageName={PageNames.PLANTS_PAGE}
          createPageRoute={RoutePaths.CREATE_PLANT_ROUTE}
        />
        <Row style={{textAlign: 'center'}}>
          {plantData &&
            <PlantsTable plants={plantData}></PlantsTable>
          }
        </Row>
      </Row>
    :
      <Unauthorized/>
    }
  </Row>);
};

export default Plants;
