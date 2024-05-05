import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Table,
} from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from 'service/store/index.types';
import { useState } from 'react';
import styles from './index.module.css';
import { generateDate } from '../../utils';
import {
  ReceiptType,
  TNomenclatureProduct,
  TReceipt,
} from '../../service/slices/receipts/index.types';
import { openModal, setAction } from '../../service/slices/modal';
import { ModalType } from '../../service/slices/modal/index.types';
import ModalSwitch from '../../components/modal_switch';
import { deleteProduct } from '../../service/slices/receipts';

const Receipt = () => {
  const dispatch = useAppDispatch();
  const { receipts, receiptType, receiptId } = useAppSelector((store) => store.receipts);
  const receipt = receipts.find((receipt) => receipt._id === receiptId) as TReceipt;
  const { provider, contract } = useAppSelector((store) => store.receipts.newReceipt);
  const receiptNumber = receipts[receipts.length - 1].number;
  const { products } = useAppSelector((state) => state.receipts.newReceipt);
  const today = new Date();

  const [vendor, setVendor] = useState(
    receiptType === ReceiptType.NEW ? 'Аларм-моторс Озерки' : receipt.vendor
  );
  const [store, setStore] = useState(
    receiptType === ReceiptType.NEW ? 'Выберите склад' : receipt.store
  );
  const [document, setDocument] = useState(receiptType === ReceiptType.NEW ? '' : receipt.document);
  const [invoice, setInvoice] = useState(receiptType === ReceiptType.NEW ? '' : receipt.invoice);
  const [date, setDate] = useState(receiptType === ReceiptType.NEW ? '' : receipt.docdate);
  const [vat, setVat] = useState(receiptType === ReceiptType.NEW ? 0.2 : receipt.vat);
  const [activeProduct, setActiveProduct] = useState<TNomenclatureProduct | null>(null);
  const [isVATnull, setIsVATnull] = useState(false);

  const productsList = products.map((product) => {
    return (
      <tr
        onClick={() => {
          setActiveProduct(product);
        }}
        style={{ cursor: 'pointer' }}
        key={product.uniqueListId}>
        <td>
          <Form.Check
            checked={activeProduct?.uniqueListId === product.uniqueListId}
            readOnly
            type="radio"
            name="productInReceipt"
          />
        </td>
        <td>{product.sku}</td>
        <td>{product.name}</td>
        <td>{product.amount}</td>
        <td>{product.price}</td>
        <td>{(product.price * product.amount).toFixed(2)}</td>
        <td>{(product.price * product.amount * vat).toFixed(2)}</td>
        <td>
          {(product.price * product.amount + product.price * product.amount * vat).toFixed(2)}
        </td>
        <td>{product.country}</td>
        <td>{product.customDeclaration}</td>
        <td>{product.location}</td>
      </tr>
    );
  });

  const generatestores = (vendor: string) => {
    switch (vendor) {
      case 'Аларм-моторс Озерки':
        return (
          <NavDropdown title={store} menuVariant="dark">
            <NavDropdown.Item onClick={() => setStore('З\\ч склад Exeed')}>
              З\ч склад Exeed
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setStore('З\\ч склад Omoda')}>
              З\ч склад Omoda
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setStore('З\\ч склад Ford')}>
              З\ч склад Ford
            </NavDropdown.Item>
          </NavDropdown>
        );
      case 'Аларм-моторс Юго-запад':
        return (
          <NavDropdown title={store} menuVariant="dark">
            <NavDropdown.Item onClick={() => setStore('З\\ч склад Tank')}>
              З\ч склад Tank
            </NavDropdown.Item>
          </NavDropdown>
        );
      case 'Аларм-моторс Лахта':
        return (
          <NavDropdown title={store} menuVariant="dark">
            <NavDropdown.Item onClick={() => setStore('З\\ч склад Geely')}>
              З\ч склад Geely
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setStore('З\\ч склад Faw')}>
              З\ч склад Faw
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setStore('З\\ч склад Sollers')}>
              З\ч склад Sollers
            </NavDropdown.Item>
          </NavDropdown>
        );
      case 'Аларм-Комтранс':
        return (
          <NavDropdown title={store} menuVariant="dark">
            <NavDropdown.Item onClick={() => setStore('З\\ч склад Mazda')}>
              З\ч склад Mazda
            </NavDropdown.Item>
          </NavDropdown>
        );
    }
  };

  return (
    <>
      <section
        style={{ display: 'flex', minHeight: 'calc(100vh - 66px)', flexDirection: 'column' }}
        className="p-3 pb-0">
        <h4>
          Поступление товаров - С000046{receiptNumber !== null && receiptNumber + 1} от{' '}
          {generateDate(today)}
        </h4>
        <h5 style={{ maxWidth: '250px' }}>
          <NavDropdown title={vendor} menuVariant="dark">
            <NavDropdown.Item
              onClick={() => {
                setVendor('Аларм-моторс Озерки');
                setStore('З\\ч склад Exeed');
              }}>
              Аларм-моторс Озерки
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                setVendor('Аларм-моторс Юго-запад');
                setStore('З\\ч склад Tank');
              }}>
              Аларм-моторс Юго-запад
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                setVendor('Аларм-моторс Лахта');
                setStore('З\\ч склад Geely');
              }}>
              Аларм-моторс Лахта
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                setVendor('Аларм-Комтранс');
                setStore('З\\ч склад Mazda');
              }}>
              Аларм-Комтранс
            </NavDropdown.Item>
          </NavDropdown>
        </h5>
        <h6 style={{ maxWidth: '150px' }} className="mt-3">
          {generatestores(vendor)}
        </h6>
        <Container className="mt-5" fluid>
          <Row>
            <Col className="px-0" xs={1}>
              Поставщик:
            </Col>
            <Col xs={2}>
              <Form.Control
                value={receiptType === ReceiptType.NEW ? provider.name : receipt.provider.name}
                size="sm"
                type="text"
                disabled
              />
            </Col>
            <Col xs={1}>
              <Button
                onClick={() => {
                  dispatch(openModal(ModalType.PROVIDER));
                }}
                size="sm">
                Выбрать
              </Button>
            </Col>
            <Col xs={1}>Договор:</Col>
            <Col xs={2}>
              <Form.Control
                onChange={(event) => {
                  setDocument(event.target.value);
                }}
                value={document}
                size="sm"
                type="text"
              />
            </Col>
            <Col xs={2}>
              <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '146px' }}>
                от{' '}
                <input
                  onChange={(event) => {
                    setDate(event.target.value);
                  }}
                  value={date}
                  className={styles.date}
                  type="date"
                  name="calendar"
                />
              </div>
            </Col>
            <Col xs={2}>Налог:</Col>
          </Row>
          <Row className="mt-3">
            <Col className="px-0" xs={1}>
              Документ:
            </Col>
            <Col xs={2}>
              <Form.Control
                value={receiptType === ReceiptType.NEW ? contract : receipt.contract}
                size="sm"
                type="text"
                disabled
              />
            </Col>
            <Col xs={1}>
              <Button
                onClick={() => {
                  dispatch(openModal(ModalType.CONTRACT));
                }}
                disabled={provider.name === ''}
                size="sm">
                Выбрать
              </Button>
            </Col>
            <Col xs={1}>СФ:</Col>
            <Col xs={2}>
              <Form.Control
                onChange={(event) => {
                  setInvoice(event.target.value);
                }}
                value={invoice}
                size="sm"
                type="text"
              />
            </Col>
            <Col xs={2}>
              <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '146px' }}>
                от{' '}
                <input
                  onChange={(event) => {
                    setDate(event.target.value);
                  }}
                  value={date}
                  className={styles.date}
                  type="date"
                  name="calendar"
                />
              </div>
            </Col>
            <Col xs={2}>
              <Form.Select
                onChange={(event) => {
                  setVat(+event.target.value);
                  if (event.target.value === 'Без налога') {
                    setIsVATnull(true);
                  } else {
                    setIsVATnull(false);
                  }
                }}
                size="sm"
                defaultValue={vat}>
                <option value={1}>Без налога</option>
                <option value={0.1}>НДС сверху 10%</option>
                <option value={0.2}>НДС сверху 20%</option>
              </Form.Select>
            </Col>
          </Row>
        </Container>
        <Navbar expand="lg" className="mt-5">
          <Container className="px-0" fluid>
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                <Nav.Link
                  onClick={() => {
                    dispatch(openModal(ModalType.PRODUCT));
                  }}>
                  Добавить
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    dispatch(openModal(ModalType.WARNING));
                    activeProduct && dispatch(setAction(deleteProduct(activeProduct)));
                  }}
                  disabled={!activeProduct}>
                  Удалить
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    dispatch(openModal(ModalType.PRODUCT_DETAILS));
                  }}
                  disabled={!activeProduct}>
                  Изменить
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Товар</th>
              <th>Наименование</th>
              <th>Кол-во</th>
              <th>Цена</th>
              <th>Сумма</th>
              {!isVATnull ? <th>НДС</th> : null}
              <th>Всего</th>
              <th>Страна</th>
              <th>ГТД</th>
              <th>Локация</th>
            </tr>
          </thead>
          <tbody>{productsList}</tbody>
        </Table>
        <div style={{ marginTop: 'auto', marginLeft: 'auto' }}>
          <Button
            onClick={() => {
              console.log({
                vendor,
                store,
                provider,
                contract,
                document,
                date,
                invoice,
                vat,
                products,
              });
            }}
            variant="primary">
            Сохранить
          </Button>
          <Button style={{ marginLeft: '8px' }} variant="primary">
            Закрыть
          </Button>
        </div>
      </section>
      <ModalSwitch />
    </>
  );
};

export default Receipt;
