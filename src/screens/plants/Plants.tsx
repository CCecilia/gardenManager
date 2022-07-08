import React, { useEffect, useState } from 'react';

import { IPlant } from '../../types/Plant.interface';
import { getPlantData } from '../../services/Plant.service';
import { PageNames } from '../../types/PageNames.enum';
import { titleCase } from '../../utilities/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../types/RoutePaths.enum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PlantsTable from '../../components/plantsTable';
import { useAuth } from '../../hooks/useAuth';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

      const data = (await getPlantData()) as IPlant[];
      setPlantData(data);
    })();
  }, []);

  return (
    <>
      <Row style={{margin:'1vh auto'}}>
        <Col xs={10}>
          <h2 className="heading">{titleCase(PageNames.PLANTS_PAGE)}</h2>
        </Col>
        <Col style={{textAlign:'right'}}>
          <Link
            to={RoutePaths.CREATE_PLANT_ROUTE}
            className="btn btn-success btn-round"
            aria-current="page"
          >
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </Col>
      </Row>
      <Row>
        {plantData &&
          <PlantsTable plants={plantData}></PlantsTable>
        }
      </Row>
    </>
  );
};

export default Plants;
