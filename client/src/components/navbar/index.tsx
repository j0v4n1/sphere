import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { Dropdown, DropdownButton, Navbar as NavbarBootstrap } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { NavbarProps, Role } from './index.types';
import { useAppDispatch, useAppSelector } from 'service/store/index.types';
import { logoutUser } from '../../utils/api';
import { removeUser } from 'service/slices/user';
import { navigator } from '../../utils';
import { setIsLogout } from '../../service/slices/general';

export default function Navbar({ role }: NavbarProps) {
  const { name } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setIsLogout(true));
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error();
    }
    logoutUser(refreshToken)
      .then(() => {
        dispatch(setIsLogout(false));
        localStorage.removeItem('refreshToken');
        dispatch(removeUser());
        navigator(null, navigate);
      })
      .catch((err) => console.log(err));
  };

  const navbarBrand = () => {
    switch (role) {
      case Role.ADMIN:
        return 'Cфера.Админ';
      case Role.USER:
        return 'Cфера.Склад';
      case Role.SUPER_USER:
        return 'Cфера.Склад(Расширенный)';
      default:
        return 'Cфера.Вход';
    }
  };

  const navbarLinks = () => {
    switch (role) {
      case Role.ADMIN:
        return (
          <NavLink
            className="nav-link"
            to="users"
            style={({ isActive }) => {
              return { fontWeight: isActive ? 'bold' : '' };
            }}>
            Пользователи
          </NavLink>
        );
      case Role.USER:
        return (
          <>
            <NavLink
              className="nav-link"
              to="receipts"
              style={({ isActive }) => {
                return { fontWeight: isActive ? 'bold' : '' };
              }}>
              Поступления
            </NavLink>
            <NavLink
              className="nav-link"
              to="/nomenclature"
              style={({ isActive }) => {
                return { fontWeight: isActive ? 'bold' : '' };
              }}>
              Номенклатура
            </NavLink>
            <NavLink
              className="nav-link"
              style={({ isActive }) => {
                return { fontWeight: isActive ? 'bold' : '' };
              }}
              to="/orders">
              Журнал заказ-нарядов
            </NavLink>
            <NavDropdown title="Оперативные" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Материальная ведомость</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Отчёты</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Остатки Маркировки</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Печать реестров документов</NavDropdown.Item>
            </NavDropdown>
          </>
        );
      case Role.SUPER_USER:
        return <></>;
      default:
        return <></>;
    }
  };

  const isShowedSearchBar = role ? (
    <Form className="d-flex">
      <Form.Control type="search" placeholder="Поиск" className="me-2" aria-label="Search" />
      <Button variant="outline-success">Найти</Button>
    </Form>
  ) : null;

  return (
    <NavbarBootstrap expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <NavbarBootstrap.Brand href="#">{navbarBrand()}</NavbarBootstrap.Brand>
        <NavbarBootstrap.Toggle aria-controls="navbarScroll" />
        <NavbarBootstrap.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            {navbarLinks()}
          </Nav>
          {role ? (
            <DropdownButton
              className="mx-3"
              id="dropdown-basic-button"
              title={name.split(' ').map((el, index) => {
                if (index === 1) {
                  return `${el.slice(0, 1)}.`;
                }
                if (index === 0) {
                  return `${el} `;
                }
                return index !== 2 && el;
              })}>
              <Dropdown.Item onClick={handleLogout}>Выйти</Dropdown.Item>
            </DropdownButton>
          ) : null}
          {isShowedSearchBar}
        </NavbarBootstrap.Collapse>
      </Container>
    </NavbarBootstrap>
  );
}
