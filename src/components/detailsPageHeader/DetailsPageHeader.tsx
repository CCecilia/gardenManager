import React from 'react';import Row from 'react-bootstrap/Row';
import { titleCase } from '../../utilities/Typography';

type Props = {
  name: string | null,
  id: string,
  dateCreated: Date
};

const DetailsPageHeader: React.FC<Props> = ({name, id, dateCreated}) => {
  return <>
    <Row style={{marginTop: '1vh'}}>
      {name &&
        <Row>
          <h3>
            {titleCase(name)}&nbsp;
          </h3>
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