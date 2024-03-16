import { useContext } from "react";
import Badge from "react-bootstrap/Badge";
import {
  Button,
  Col,
  Container,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  Row,
} from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
const Header = (props) => {
  const authCtx = useContext(AuthContext);
  const loggedIn = authCtx.isLogged;
  const loggedOut = authCtx.logout;
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <NavbarBrand style={{ color: "white" }}>
            <h1>Expense Tracker</h1>
          </NavbarBrand>
          <NavbarToggle aria-controls="basic-navbar-nav" />
          <NavbarCollapse id="basic-navbar-nav">
            <Nav fill variant="tabs">
              <Nav.Item>
                <NavLink to="/welcome" className="nav-link">
                  <h5> Home</h5>
                </NavLink>
              </Nav.Item>
              <NavItem>
                <NavLink to="/tracker" className="nav-link">
                  <h5> Tracker</h5>
                </NavLink>
              </NavItem>
            </Nav>
          </NavbarCollapse>
          {loggedIn && (
            <div>
              <Container>
                <Row>
                  <Col>
                    <Navbar bg="dark" data-bs-theme="dark">
                      <Container>
                        <NavbarToggle aria-controls="basic-navbar-nav" />
                        <NavbarCollapse id="basic-navbar-nav">
                          <Nav fill variant="tabs">
                            <Nav.Item>
                              <NavLink to="/profile" className="nav-link">
                                <h5>
                                  Profile
                                  {!props.forUpdate && (
                                    <Badge bg="secondary">Update</Badge>
                                  )}
                                </h5>
                              </NavLink>
                            </Nav.Item>
                          </Nav>
                        </NavbarCollapse>
                      </Container>
                    </Navbar>
                  </Col>
                  <Col>
                    <NavLink to="/welcome">
                      <h5>
                        <Button
                          variant="primary"
                          style={{ marginTop: "17px" }}
                          onClick={loggedOut}
                        >
                          Log Out
                        </Button>
                      </h5>
                    </NavLink>
                  </Col>
                </Row>
              </Container>
            </div>
          )}
          {!loggedIn && (
            <NavLink to="/auth">
              <h5>
                <Button
                  variant="primary"
                  style={{ marginTop: "17px" }}
                  onClick={loggedOut}
                >
                  Log In
                </Button>
              </h5>
            </NavLink>
          )}
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};
export default Header;
