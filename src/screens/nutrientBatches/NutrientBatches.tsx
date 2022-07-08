import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NutrientBatchTable from '../../components/nutrientBatchTable';
import { useAuth } from '../../hooks/useAuth';
import { getAllNutrientBatches } from '../../services/NutrientBatch.service';
import { INutrientBatch } from '../../types/INutrientBatch';
import { PageNames } from '../../types/PageNames.enum';
import { titleCase } from '../../utilities/Typography';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { RoutePaths } from '../../types/RoutePaths.enum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
    <Row style={{margin:'1vh auto'}}>
      <Col xs={10}>
        <h2 className="heading">{titleCase(PageNames.NUTRIENT_BATCHES_PAGE)}</h2>
      </Col>
      <Col style={{textAlign:'right'}}>
        <Link
          to={RoutePaths.CREATE_CROP_ROUTE}
          className="btn btn-success btn-round"
          aria-current="page"
        >
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </Col>
    </Row>
    <Row>
      {nutrientBatchData &&
        <NutrientBatchTable nutrientBatches={nutrientBatchData}></NutrientBatchTable>
      }
    </Row>
  </>;
};

export default NutrientBatches;