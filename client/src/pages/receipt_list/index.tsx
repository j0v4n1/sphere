import { Container, Nav, Navbar, Table } from 'react-bootstrap';
import { getReceipts, setReceiptId, setReceiptType } from '../../service/slices/receipts';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'service/store/index.types';
import Spinner from 'react-bootstrap/Spinner';
import styles from './/index.module.css';
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-router-dom';
import { ReceiptType } from '../../service/slices/receipts/index.types';

const ReceiptList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getReceipts());
  }, []);

  const { receipts, loading } = useAppSelector((store) => store.receipts);
  const { receiptId } = useAppSelector((state) => state.receipts);

  const tables = receipts.map(
    ({ number, date, provider, author, total, store, time, invoice, _id }) => {
      return (
        <tr
          key={_id}
          onClick={() => {
            dispatch(setReceiptId(_id));
            dispatch(setReceiptType(ReceiptType.DETAILS));
          }}>
          <td style={{ cursor: 'pointer' }}>
            <Form.Check
              type="radio"
              checked={_id === receiptId}
              name="receipt"
              readOnly></Form.Check>
          </td>
          <td style={{ cursor: 'pointer' }}>{date}</td>
          <td style={{ cursor: 'pointer' }}>Поступление товаров</td>
          <td style={{ cursor: 'pointer' }}>
            {number !== null && number < 10 ? `С0000460${number}` : `С000046${number}`}
          </td>
          <td style={{ cursor: 'pointer' }}>
            {invoice === 'Без СФ' ? invoice : `${invoice} от ${date}`}
          </td>
          <td style={{ cursor: 'pointer' }}>{provider.name}</td>
          <td style={{ cursor: 'pointer' }}>{store}</td>
          <td style={{ cursor: 'pointer' }}>{total}</td>
          <td style={{ cursor: 'pointer' }}>{author}</td>
          <td style={{ cursor: 'pointer' }}>{time}</td>
        </tr>
      );
    }
  );

  function BasicExample() {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return loading ? (
    <div className={styles.wrapper}>{BasicExample()}</div>
  ) : (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <NavLink
                onClick={() => {
                  dispatch(setReceiptType(ReceiptType.NEW));
                }}
                className="nav-link"
                to="./add">
                Добавить
              </NavLink>
              <Nav.Link>Удалить</Nav.Link>
              <NavLink
                onClick={() => {
                  dispatch(setReceiptType(ReceiptType.DETAILS));
                }}
                className="nav-link"
                to={`./${receiptId}`}>
                Изменить
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>#</th>
            <th style={{ textAlign: 'center' }}>Дата</th>
            <th style={{ textAlign: 'center' }}>Документ</th>
            <th style={{ textAlign: 'center' }}>Номер</th>
            <th style={{ textAlign: 'center' }}>СФ</th>
            <th style={{ textAlign: 'center' }}>Поставщик</th>
            <th style={{ textAlign: 'center' }}>Место хранения</th>
            <th style={{ textAlign: 'center' }}>Всего</th>
            <th style={{ textAlign: 'center' }}>Автор</th>
            <th style={{ textAlign: 'center' }}>Время</th>
          </tr>
        </thead>
        <tbody>{tables}</tbody>
      </Table>
    </>
  );
};

export default ReceiptList;
