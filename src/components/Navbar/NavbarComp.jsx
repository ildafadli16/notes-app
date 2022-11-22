import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import "../Navbar/NavbarComp.css";

const NavbarComp = ({ onLogout }) => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#notes">Notes Apps</Navbar.Brand>
          <Nav className="ms-auto">
            <NavLink className="link" to="/add">
              Add Note
            </NavLink>

            <Button variant="outline-primary" onClick={() => onLogout()}>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComp;
