import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getAllCropData } from '../../services/Crop.service';
import { ICrop } from '../../types/Crop.interface';
import { PageNames } from '../../types/PageNames.enum';
import { RoutePaths } from '../../types/RoutePaths.enum';
import TableHeader from '../../components/tableHeader';
import TableRow from './tableRow';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import TablePageHeader from '../../components/tablePageHeader';

const Crops: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [cropData, setCropData] = useState<ICrop[] | null>(null);


  useEffect(() => {
    (async () => {
      if (auth) {
        const [shouldRedirect, redirectRoute] = auth.shouldRedirect();

        if ( shouldRedirect && redirectRoute ) {
          navigate(redirectRoute);
        }
      }
      const data = (await getAllCropData()) as ICrop[];
      setCropData(data);
      console.log(Object.keys(data[0]));
    })();
  }, []);

  return (
    <>
      <TablePageHeader
        pageName={PageNames.CROPS_PAGE}
        createPageRoute={RoutePaths.CREATE_CROP_ROUTE}
      />
      <Row>
        <Table responsive striped bordered hover variant="dark">
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
        </Table>
      </Row>
    </>
  );
};

export default Crops;
