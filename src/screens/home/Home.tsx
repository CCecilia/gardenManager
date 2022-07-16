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
      <Row class="crops-section">
        <Col xs={6}>
          <Stack className="header__text-stack">
            <div>
              
            </div>
          </Stack>
        </Col>
        <Col xs={6}>
          <Stack className="header__text-stack">
              <h1 className="heading-primary heading-primary--main utils-margin-bottom-small">Garden Manager</h1>
              <h1 className="heading-primary heading-primary--sub">Optimized Plant Growth</h1>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
