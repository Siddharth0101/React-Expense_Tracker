import {
  Container,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
const Header = (props) => {
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
                <NavLink to="/home" className="nav-link">
                  <h5> Home</h5>
                </NavLink>
              </Nav.Item>
              <NavItem>
                <NavLink to="/store" className="nav-link">
                  <h5> Tracker</h5>
                </NavLink>
              </NavItem>
              <NavItem></NavItem>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};
export default Header;
