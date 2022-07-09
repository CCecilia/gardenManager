import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { INutrientBatchApplication } from '../../types/INutrientBatchApplication';
import TableHeader from '../tableHeader';
import TableRow from './tableRow';

type Props = {
  applications: INutrientBatchApplication[],
  showModal: () => void
};

const ApplicationTable: React.FC<Props> = ({applications, showModal}) => {
  return <Row>
    <Row>
      <Col xs={12} style={{marginTop: '1vh'}}>
        <h3>Applications</h3>
      </Col>
      <Col xs={12}>
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
        <Button variant="primary" onClick={showModal}>
          Add Application
        </Button>
      </Col>
    </Row>
  </Row>;
};

export default ApplicationTable;