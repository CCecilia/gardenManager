import React, { useEffect, useState } from 'react';

import { IPlant } from '../../types/Plant.interface';
import TableHeader from '../tableHeader';
import TableRow from './tableRow';
import { getPlantData } from '../../services/Plant.service';

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
    </>
  );
};

export default Plants;
