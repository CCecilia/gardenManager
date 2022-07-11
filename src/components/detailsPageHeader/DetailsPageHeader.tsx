import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { titleCase } from '../../utilities/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

type Props = {
  name: string | null,
  id: string,
  dateCreated: Date,
  closeUpdateForm: () => void,
  openUpdateForm: () => void,
  showUpdateForm: boolean
};

const DetailsPageHeader: React.FC<Props> = ({ name, id, dateCreated, closeUpdateForm, openUpdateForm, showUpdateForm }) => {
  return <>
    <Row style={{marginTop: '1vh'}}>
      {name &&
        <Row>
          <Col xs={10}>
            <h3>
              {titleCase(name)}&nbsp;
            </h3>
          </Col>
          <Col xs={2} style={{textAlign: 'right'}}>
            {showUpdateForm ?
              <Button
                onClick={closeUpdateForm}
                variant="outline-danger"
              >
                <FontAwesomeIcon icon={faTimes} size="2x" />
              </Button>
            :
              <Button
                onClick={openUpdateForm}
                variant="outline-warning"
              >
                <FontAwesomeIcon icon={faEdit} size="2x" />
              </Button>
            }
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