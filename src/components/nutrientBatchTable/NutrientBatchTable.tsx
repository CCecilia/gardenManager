import React from 'react';
import { INutrientBatch } from '../../types/INutrientBatch';
import TableHeader from '../tableHeader';
import TableRow from './tableRow';

type Props = {
  nutrientBatches: INutrientBatch[]
};

const NutrientBatchTable: React.FC<Props> = ({ nutrientBatches }) => {
  return <>
    <table className="table table-striped table-dark">
      <thead>
        <tr>
          <TableHeader key={1} header="Date Created"></TableHeader>
          <TableHeader key={2} header="Total Water Gallons"></TableHeader>
          <TableHeader key={3} header="Total Flora Micro mls"></TableHeader>
          <TableHeader key={4} header="Total Flora Bloom mls"></TableHeader>
          <TableHeader key={5} header="Total Flora Gro mls"></TableHeader>
        </tr>
      </thead>
      <tbody>
        {nutrientBatches &&
          nutrientBatches.map((data: INutrientBatch, index: number) => {
            return <TableRow key={index} nutrientBatchData={data}></TableRow>;
          })}
      </tbody>
    </table>
  </>;
};

export default NutrientBatchTable;