import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { PageNames } from '../../types/PageNames.enum';
import { RoutePaths } from '../../types/RoutePaths.enum';
import { titleCase } from '../../utilities/Typography';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  pageName: PageNames,
  createPageRoute: RoutePaths
};

const TablePageHeader: React.FC<Props> = ({pageName, createPageRoute}) => {
  return <>
    <Row style={{margin:'1vh auto', paddingLeft: '0'}}>
        <Col xs={10} style={{paddingLeft: '0'}}>
          <h2 className="heading">{titleCase(pageName)}</h2>
        </Col>
        <Col style={{textAlign:'right'}}>
          <Link
            to={createPageRoute}
            className="btn btn-outline-success btn-round"
            aria-current="page"
          >
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </Col>
      </Row>
  </>;
};

export default TablePageHeader;