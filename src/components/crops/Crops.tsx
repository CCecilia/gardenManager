import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getCropData } from '../../services/Crop.service';
import { ICrop } from '../../types/Crop.interface';
import { PageNames } from '../../types/PageNames.enum';
import { titleCase } from '../../utilities/Typography';
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
      <div className="row">
        <div className="col-6">
          <h2 className="heading">{titleCase(PageNames.CROPS_PAGE)}</h2>
        </div>
        <div className="col-6">
          <button className="btn btn-success btn-round">+</button>
        </div>
      </div>
      <div className="row">
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
      </div>
    </>
  );
};

export default Crops;
