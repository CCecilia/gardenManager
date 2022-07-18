import './Home.scss';

import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { RoutePaths } from '../../types/RoutePaths.enum';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { Container } from 'react-bootstrap';

const Home: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth && auth.user) {
    navigate(RoutePaths.DASHBOARD_ROUTE);
  };

  return (
    <Container>
      <Row className="header">
        <Col xs={12}>
          <Stack className="header__text-stack">
              <h1 className="heading-primary heading-primary--main utils-margin-bottom-small">Garden Manager</h1>
              <h1 className="heading-primary heading-primary--sub">Optimized Plant Growth</h1>
          </Stack>
        </Col>
      </Row>
      <Row className="crops-section">
        <Col xs={6}>
          <Stack className="crops-section__image-stack">
            <div className="crops-section__image-stack--image-box">
              <img className="crops-section__image-stack--image" src={`${process.env.PUBLIC_URL}/images/hydroponic-plant.png`} />
            </div>
            <div className="crops-section__image-stack--image-box">
              <img className="crops-section__image-stack--image" src={`${process.env.PUBLIC_URL}/images/hydroponic-crops.jpg`} />
            </div>
            <div className="crops-section__image-stack--image-box">
              <img className="crops-section__image-stack--image" src={`${process.env.PUBLIC_URL}/images/plantsAndEnergy.jpg`} />
            </div>
          </Stack>
        </Col>
        <Col xs={6}>
          <Stack className="crops-section__text-stack">
            <div className="crops-section__text-stack--text-box">
              <h3 className="crops-section__text-stack--heading">Track Individual Plants</h3>
              <p className="crops-section__text-stack--text">Track individual plant growth of each plant in your crop easily. You can track growth by plant height, number of leaves, root length, and other data points.</p>
            </div>
            <div className="crops-section__text-stack--text-box">
              <h3 className="crops-section__text-stack--heading">Track A Crop</h3>
              <p className="crops-section__text-stack--text">By gathering data from the individual plants you can trakc the overall growth/health of your entire crop.</p>
            </div>
            <div className="crops-section__text-stack--text-box">
              <h3 className="crops-section__text-stack--heading">Track Energy and Nutrient Usage</h3>
              <p className="crops-section__text-stack--text">Through tracking your energy and nutrient usage this data and be aggregated together with the plant data and cost estimates can be obat8ined on a per plant basis.</p>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
