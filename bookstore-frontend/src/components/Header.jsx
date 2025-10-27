import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Bookstore</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/about">Acerca de</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
