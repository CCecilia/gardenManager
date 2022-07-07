import React from 'react';
import { IPlant } from '../../types/Plant.interface';
import TableHeader from '../tableHeader';
import TableRow from './tableRow';

type Props = {
  plants: IPlant[]
};

const PlantsTable: React.FC<Props> = ({ plants }) => {
  return <>
    <table className="table table-striped table-dark">
      <thead>
        <tr>
          <TableHeader key={0} header="ID"></TableHeader>
          <TableHeader key={1} header="Common Name"></TableHeader>
          <TableHeader key={2} header="Date Created"></TableHeader>
        </tr>
      </thead>
      <tbody>
        {plants &&
          plants.map((data: IPlant, index: number) => {
            return <TableRow key={index} plantData={data}></TableRow>;
          })}
      </tbody>
    </table>
  </>;
};

export default PlantsTable;