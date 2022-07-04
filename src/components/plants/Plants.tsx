import React, { useEffect, useState } from 'react';

import { IPlant } from '../../types/Plant.interface';
import TableHeader from '../tableHeader';
import TableRow from './tableRow';
import { getPlantData } from '../../services/Plant.service';
import { PageNames } from '../../types/PageNames.enum';
import { titleCase } from '../../utilities/Typography';
import { Link } from 'react-router-dom';
import { RoutePaths } from '../../types/RoutePaths.enum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type Props = {};

const Plants: React.FC<Props> = () => {
  const [plantData, setPlantData] = useState<IPlant[] | null>(null);

  useEffect(() => {
    (async () => {
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
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <TableHeader key={0} header="ID"></TableHeader>
              <TableHeader key={1} header="Common Name"></TableHeader>
              <TableHeader key={2} header="Date Created"></TableHeader>
              <TableHeader key={3} header="Growth"></TableHeader>
              <TableHeader key={4} header="Heigth"></TableHeader>
            </tr>
          </thead>
          <tbody>
            {plantData &&
              plantData.map((data: IPlant, index: number) => {
                return <TableRow key={index} plantData={data}></TableRow>;
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Plants;
