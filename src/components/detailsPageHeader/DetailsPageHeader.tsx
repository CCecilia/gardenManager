import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { titleCase } from '../../utilities/Typography';

type Props = {
  name: string | null,
  id: string,
  dateCreated: Date,
  showForm: () => void,
  isShowingForm: boolean
};

const DetailsPageHeader: React.FC<Props> = ({ name, id, dateCreated, showForm }) => {
  return <>
    <Row style={{marginTop: '1vh'}}>
      {name &&
        <Row>
          <Col xs={10}>
            <h3>
              {titleCase(name)}&nbsp;
            </h3>
          </Col>
          <Col xs={2}>

          </Col>
        </Row>
      }
      <Row>
        <small className="text-muted">
          ID: {id}
        </small>
        <small className="text-muted">Date Created: { new Date(dateCreated).toLocaleDateString() }</small>
      </Row>
    </Row>
  </>;
};

export default DetailsPageHeader;