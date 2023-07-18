import { User } from "../models/user";
import { Container, Navbar, Nav } from "react-bootstrap";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLogoutView from "./NavBarLogoutView";
import { Link } from "react-router-dom";
interface NavBarProps {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLogInClicked: () => void;
  onLogoutSuccessful: () => void;
}
const NavBar = ({
  loggedInUser,
  onSignUpClicked,
  onLogInClicked,
  onLogoutSuccessful,
}: NavBarProps) => {
  return (
    <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Note App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link as={Link} to="/privacy">
              Privacy
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {loggedInUser ? (
              <NavBarLoggedInView
                user={loggedInUser}
                onLogoutSuccessful={onLogoutSuccessful}
              />
            ) : (
              <NavBarLogoutView
                onSignUpclicked={onSignUpClicked}
                onLogInClicked={onLogInClicked}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
