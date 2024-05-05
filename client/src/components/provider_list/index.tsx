import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from 'service/store/index.types';
import React, { useState } from 'react';
import { setActiveProvider, setIsActiveProvider } from 'service/slices/receipts';
import { TProvider } from 'service/slices/general/index.types';

const ProviderList = () => {
  const dispatch = useAppDispatch();
  const { providers } = useAppSelector((store) => store.general);
  const { activeProvider } = useAppSelector((store) => store.receipts.newReceipt.temporaryData.provider);
  const [activeRadioButton, setActiveRadioButton] = useState<'name' | 'taxid' | 'crr'>('name');
  const [searchInput, setSearchInput] = useState('');

  const searchResults = (filter: 'name' | 'taxid' | 'crr'): TProvider[] =>
    providers.filter((p) => {
      return p[filter].toString().toLowerCase().includes(searchInput.toLowerCase());
    });

  const providerList = searchResults(activeRadioButton).map((provider) => {
    return (
      <tr
        key={provider._id}
        style={{ cursor: 'pointer' }}
        onClick={() => {
          dispatch(setIsActiveProvider(true));
          dispatch(setActiveProvider(provider));
        }}>
        <td>
          <Form.Check readOnly name="provider" checked={activeProvider?._id === provider._id} type="radio" />
        </td>
        <td>{provider.name}</td>
        <td>{provider.taxid}</td>
        <td>{provider.crr}</td>
        <td>{provider.registered}</td>
      </tr>
    );
  });

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActiveRadioButton(event.target.value as 'name' | 'taxid' | 'crr');
  };

  return (
    <>
      <Row>
        <Col xs="auto">
          <Form.Control
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
            type="text"
            className=" mr-sm-2"
          />
        </Col>
        <Col xs="auto">
          <Button type="submit">Найти</Button>
        </Col>
        <Col
          xs="auto"
          style={{
            margin: 'auto',
            width: '100%',
            maxWidth: '350px',
          }}>
          <Form style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Form.Check
              checked={activeRadioButton === 'name'}
              onChange={handleOptionChange}
              value={'name'}
              id="name"
              label="Имя"
              type="radio"
              name="searchProvider"
            />
            <Form.Check
              checked={activeRadioButton === 'taxid'}
              onChange={handleOptionChange}
              value={'taxid'}
              id="taxid"
              label="ИНН"
              type="radio"
              name="searchProvider"
            />
            <Form.Check
              checked={activeRadioButton === 'crr'}
              onChange={handleOptionChange}
              value={'crr'}
              id="crr"
              label="КПП"
              type="radio"
              name="searchProvider"
            />
          </Form>
        </Col>
      </Row>
      <Table className="mt-3" striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Имя</th>
            <th>ИНН</th>
            <th>КПП</th>
            <th>Юридический адрес</th>
          </tr>
        </thead>
        <tbody>{providerList}</tbody>
      </Table>
    </>
  );
};

export default ProviderList;
