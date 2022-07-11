import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../../hooks/useAuth';
import { RoutePaths } from '../../types/RoutePaths.enum';
import { useNavigate } from 'react-router-dom';

type Props = {};

const NavBar: React.FC<Props> = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const authorizedLinks = auth && auth.user;

  const handleLinkOnCLick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    const link = event.currentTarget.getAttribute('href');
    if (link) {
      navigate(link);
    }
    ;
  };

  return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href={authorizedLinks ? RoutePaths.DASHBOARD_ROUTE : RoutePaths.HOME_ROUTE} onClick={handleLinkOnCLick}>Garden Manager</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {authorizedLinks ?
            <>
              <NavDropdown title="Garden Data" id="collasible-nav-dropdown">
                <NavDropdown.Item href={RoutePaths.CROPS_ROUTE} onClick={handleLinkOnCLick}>Crops</NavDropdown.Item>
                <NavDropdown.Item href={RoutePaths.PLANTS_ROUTE} onClick={handleLinkOnCLick}>Plants</NavDropdown.Item>
                <NavDropdown.Item href={RoutePaths.NUTRIENT_BATCHES_ROUTE} onClick={handleLinkOnCLick}>Nutrients</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Analytics" id="collasible-nav-dropdown">
                <NavDropdown.Item href={RoutePaths.DASHBOARD_ROUTE} onClick={handleLinkOnCLick}>Dashboard</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={auth?.signOut}>Sign Out</Nav.Link>
            </>
            :
            <>
              <Nav.Link href={RoutePaths.SIGNIN_ROUTE} onClick={handleLinkOnCLick}>Sign In</Nav.Link>
              <Nav.Link href={RoutePaths.SIGNUP_ROUTE} onClick={handleLinkOnCLick}>Sign Up</Nav.Link>
            </>
          }
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>;
};

export default NavBar;