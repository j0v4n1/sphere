import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { REGEX_COUNTRY, REGEX_CUSTOM_DECLARATION, REGEX_LOCATION, REGEX_NUMBER } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../service/store/index.types';
import { setProductDetails } from '../../service/slices/receipts';
import { TNomenclatureProduct, TProductDetails } from '../../service/slices/receipts/index.types';

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

const ProductDetails = () => {
  const { activeProduct } = useAppSelector((state) => state.receipts.newReceipt.temporaryData.product);

  const product = useAppSelector((state) =>
    state.receipts.newReceipt.products.find(
      (product) => activeProduct && product.uniqueListId === activeProduct.uniqueListId
    )
  ) as TNomenclatureProduct;

  const dispatch = useAppDispatch();

  const [state, setState] = useState<TProductDetails>({
    amount: product.amount.toString(),
    price: product.price.toString(),
    country: product.country,
    customDeclaration: product.customDeclaration,
    location: product.location,
  });

  useEffect(() => {
    dispatch(setProductDetails({ ...state }));
  }, [state]);

  const handleChange = (event: React.ChangeEvent<FormControlElement>, key: keyof typeof state) => {
    setState({
      ...state,
      [key]: event.target.value,
    });
  };

  return (
    <Form className="my-5">
      <Row>
        <Col xs="6">
          <Form.Group className="position-relative">
            <Form.Label htmlFor="amount">Количество:</Form.Label>
            <Form.Control
              onChange={(event) => {
                handleChange(event, 'amount');
              }}
              isValid={REGEX_NUMBER.test(state.amount)}
              isInvalid={!REGEX_NUMBER.test(state.amount) && state.amount !== ''}
              value={state.amount}
              id="amount"
              type="text"
            />
            <Form.Control.Feedback type="invalid" tooltip>
              Введите корректое количество
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs="6">
          <Form.Group className="position-relative">
            <Form.Label htmlFor="price">Цена:</Form.Label>
            <Form.Control
              onChange={(event) => {
                handleChange(event, 'price');
              }}
              isValid={REGEX_NUMBER.test(state.price)}
              isInvalid={!REGEX_NUMBER.test(state.price) && state.price !== ''}
              value={state.price}
              id="price"
              type="text"
            />
            <Form.Control.Feedback type="invalid" tooltip>
              Введите корректую цену
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs="4">
          {' '}
          <Form.Group className="position-relative mt-5">
            <Form.Label htmlFor="country">Страна:</Form.Label>
            <Form.Control
              isValid={REGEX_COUNTRY.test(state.country)}
              isInvalid={!REGEX_COUNTRY.test(state.country) && state.country !== ''}
              onChange={(event) => {
                handleChange(event, 'country');
              }}
              value={state.country}
              id="country"
              type="text"
            />
            <Form.Control.Feedback type="invalid" tooltip>
              Этой страны нет в списке
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs="4">
          {' '}
          <Form.Group className="position-relative mt-5">
            <Form.Label htmlFor="customDeclaration">ГТД:</Form.Label>
            <Form.Control
              isValid={REGEX_CUSTOM_DECLARATION.test(state.customDeclaration)}
              isInvalid={!REGEX_CUSTOM_DECLARATION.test(state.customDeclaration) && state.customDeclaration !== ''}
              onChange={(event) => {
                handleChange(event, 'customDeclaration');
              }}
              value={state.customDeclaration}
              id="customDeclaration"
              type="text"
            />
            <Form.Control.Feedback type="invalid" tooltip>
              Введите ГТД формата 1234567890/123456/123456
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs="4">
          <Form.Group className="position-relative mt-5">
            <Form.Label htmlFor="location">Локация:</Form.Label>
            <Form.Control
              isValid={REGEX_LOCATION.test(state.location)}
              isInvalid={!REGEX_LOCATION.test(state.location) && state.location !== ''}
              onChange={(event) => {
                handleChange(event, 'location');
              }}
              value={state.location}
              id="location"
              type="text"
            />
            <Form.Control.Feedback type="invalid" tooltip>
              Введите локацию формата {<br />} 1*01-02-03/1
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default ProductDetails;
