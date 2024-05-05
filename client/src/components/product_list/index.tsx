import { Button, Col, Row, Table } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../service/store/index.types';
import Form from 'react-bootstrap/Form';
import { setActiveProduct } from '../../service/slices/receipts';

const ProductList = () => {
  const { products } = useAppSelector((state) => state.general);
  const { activeProduct } = useAppSelector((state) => state.receipts.newReceipt.temporaryData.product);
  const dispatch = useAppDispatch();

  const productList = products.map((product) => {
    return (
      <tr
        style={{ cursor: 'pointer' }}
        key={product._id}
        onClick={() => {
          dispatch(setActiveProduct(product));
        }}>
        <td>
          <Form.Check readOnly checked={activeProduct?._id === product._id} type="radio" name="product" />
        </td>
        <td>{product.sku}</td>
        <td>{product.name}</td>
        <td>{product.brand.name}</td>
        <td>{product.unit}</td>
      </tr>
    );
  });
  return (
    <>
      <Row className="mb-3">
        <Col xs="auto">
          <Form.Control type="text" className=" mr-sm-2" />
        </Col>
        <Col xs="auto">
          <Button type="submit">Найти</Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Товар</th>
            <th>Наименование</th>
            <th>Брэнд</th>
            <th>Ед. изм.</th>
          </tr>
        </thead>
        <tbody>{productList}</tbody>
      </Table>
    </>
  );
};

export default ProductList;
