import React from 'react';
import { INutrientBatchApplication } from '../../types/INutrientBatchApplication';
import TableHeader from '../tableHeader';
import TableRow from './tableRow';

type Props = {
  applications: INutrientBatchApplication[]
};

const ApplicationTable: React.FC<Props> = ({applications}) => {
  return <>
    <table className="table table-striped table-dark">
      <thead>
        <tr>
          <TableHeader key={0} header="Date Created"></TableHeader>
          <TableHeader key={1} header="Amount Used"></TableHeader>
          <TableHeader key={2} header="Remove"></TableHeader>
        </tr>
      </thead>
      <tbody>
        {applications &&
          applications.map((data: INutrientBatchApplication, index: number) => {
            return <TableRow key={index} applicationData={data}></TableRow>;
          })
        }
      </tbody>
    </table>
  </>;
};

export default ApplicationTable;