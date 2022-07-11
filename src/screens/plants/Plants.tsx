import React, { useEffect, useState } from 'react';

import { IPlant } from '../../types/Plant.interface';
import { getPlantData } from '../../services/Plant.service';
import { PageNames } from '../../types/PageNames.enum';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../types/RoutePaths.enum';
import PlantsTable from '../../components/plantsTable';
import { useAuth } from '../../hooks/useAuth';
import Row from 'react-bootstrap/Row';
import TablePageHeader from '../../components/tablePageHeader';

type Props = {};

const Plants: React.FC<Props> = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [plantData, setPlantData] = useState<IPlant[] | null>(null);

  useEffect(() => {
    (async () => {
      if (auth) {
        const [shouldRedirect, redirectRoute] = auth.shouldRedirect();

        if ( shouldRedirect && redirectRoute ) {
          navigate(redirectRoute);
        };
      };

      const data = await getPlantData();
      setPlantData(data);
    })();
  }, []);

  return (
    <>
      <TablePageHeader
        pageName={PageNames.PLANTS_PAGE}
        createPageRoute={RoutePaths.CREATE_PLANT_ROUTE}
      />
      <Row style={{textAlign: 'center'}}>
        {plantData &&
          <PlantsTable plants={plantData}></PlantsTable>
        }
      </Row>
    </>
  );
};

export default Plants;
