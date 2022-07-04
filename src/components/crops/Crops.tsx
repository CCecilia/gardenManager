import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getCropData } from '../../services/Crop.service';
import { ICrop } from '../../types/Crop.interface';
import TableHeader from '../tableHeader';
import TableRow from './tableRow';

const Crops: React.FC = () => {
  const auth = useAuth();
  const [cropData, setCropData] = useState<ICrop[] | null>(null);

  if (!auth || !auth.user) {
    return null;
  }

  useEffect(() => {
    (async () => {
      const data = (await getCropData()) as ICrop[];
      setCropData(data);
      console.log(Object.keys(data[0]));
    })();
  }, []);

  return (
    <>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <TableHeader key={0} header="ID"></TableHeader>
            <TableHeader key={1} header="Date Created"></TableHeader>
            <TableHeader key={2} header="Name"></TableHeader>
          </tr>
        </thead>
        <tbody>
          {cropData &&
            cropData.map((data: ICrop, index: number) => {
              return <TableRow key={index} cropData={data}></TableRow>;
            })}
        </tbody>
      </table>
    </>
  );
};

export default Crops;
