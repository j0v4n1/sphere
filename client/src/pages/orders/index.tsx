import Table from 'react-bootstrap/Table';
import { orders } from '../../data';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Orders = () => {
  const tables = orders.map(({ id, car, client, master, number, date }) => {
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{car}</td>
        <td>{number}</td>
        <td>{client}</td>
        <td>{master}</td>
        <td>{date}</td>
      </tr>
    );
  });

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link href="#action1">Добавить</Nav.Link>
              <Nav.Link href="#action2">Удалить</Nav.Link>
              <Nav.Link href="#" disabled>
                Изменить
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Номер заказ-наряда</th>
            <th>Модель автомобиля</th>
            <th>Номер автомобиля</th>
            <th>ФИО клиента</th>
            <th>Ведёт мастер</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>{tables}</tbody>
      </Table>
    </>
  );
};
export default Orders;
