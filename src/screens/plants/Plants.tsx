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
      console.log(Object.keys(data[0]));
    })();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-6">
          <h2 className="heading">{titleCase(PageNames.PLANTS_PAGE)}</h2>
        </div>
        <div className="col-6">
          <Link
            to={RoutePaths.CREATE_PLANT_ROUTE}
            className="btn btn-success btn-round"
            aria-current="page"
          >
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </div>
      </div>
      <div className="row">
        {plantData &&
          <PlantsTable plants={plantData}></PlantsTable>
        }
      </div>
    </>
  );
};

export default Plants;
