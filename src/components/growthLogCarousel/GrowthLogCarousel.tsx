import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { IGrowthLog } from '../../types/IGrowthLog';
import { IPlant } from '../../types/Plant.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

type Props = {
  plantData: IPlant,
  editButtonHandler: () => void,
  showingCreateGrowthLogForm: boolean
};

const GrowthLogCarousel: React.FC<Props> = ({plantData, editButtonHandler, showingCreateGrowthLogForm}) => {
  return <Row>
    <Row style={{ margin: '1vh auto' }}>
      <Col xs={10}>
        <h3>Growth Logs</h3>
      </Col>
      <Col xs={2}>
        {showingCreateGrowthLogForm ?
          <Button onClick={editButtonHandler} variant="outline-danger">
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        :
          <Button onClick={editButtonHandler} variant="outline-success">
            <FontAwesomeIcon icon={faPlus}/>
          </Button>
        }
      </Col>
    </Row>
    {plantData.growthLogs.length &&
      <Row>
        <Carousel>
          {plantData.growthLogs.map((growthLog: IGrowthLog, index: number) => {
            return <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={growthLog.img.includes('data:image/png;base64') ? growthLog.img : `data:image/png;base64,${growthLog.img}`}
                alt={plantData.commonName}
              />
              <Carousel.Caption>
                <h3>Date: { new Date(growthLog.dateCreated).toLocaleDateString() }</h3>
                <p>
                  Height: {growthLog.heightInches} in. <br/>
                  Leaves: {growthLog.numbersOfLeaves} <br/>
                  Stage: {growthLog.currentStage.name}
                </p>
              </Carousel.Caption>
            </Carousel.Item>;
          })}
          </Carousel>
      </Row>
    }
  </Row>;
};
export default GrowthLogCarousel;