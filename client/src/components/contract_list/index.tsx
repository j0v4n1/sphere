import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from 'service/store/index.types';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addContractToProvider } from 'utils';
import { TContract, TProvider } from 'service/slices/general/index.types';
import { updateProviderDocument } from 'service/slices/general';
import { setActiveContract } from '../../service/slices/receipts';

const ContractList = () => {
  const dispatch = useAppDispatch();
  const { providers } = useAppSelector((store) => store.general);
  const { provider } = useAppSelector((store) => store.receipts.newReceipt);
  const { activeContract } = useAppSelector((state) => state.receipts.newReceipt.temporaryData.contract);
  const [documentInput, setDocumentInput] = useState('');

  const onChangeDocument = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentInput(event.target.value);
  };

  const contracts = providers.find((p) => {
    return p.name === provider.name;
  })?.contracts;

  const documentsList =
    contracts !== undefined &&
    contracts.map((contract) => {
      return (
        <ListGroup.Item
          onClick={() => {
            dispatch(setActiveContract(contract));
          }}
          action
          active={contract._id === activeContract?._id}
          key={contract._id}>
          {contract.name}
        </ListGroup.Item>
      );
    });

  return (
    <>
      <Row>
        <Col xs="auto">
          <Form.Control value={documentInput} onChange={onChangeDocument} type="text" className=" mr-sm-2" />
        </Col>
        <Col xs="auto">
          <Button
            onClick={() => {
              const _id = uuidv4();
              addContractToProvider(provider._id, { _id, name: documentInput })
                .then((data: TProvider) => {
                  dispatch(updateProviderDocument(data));
                })
                .catch((err) => console.log(err))
                .finally(() => {
                  setDocumentInput('');
                });
            }}
            type="submit">
            Добавить
          </Button>
        </Col>
      </Row>
      <ListGroup className="mt-3">{documentsList}</ListGroup>
    </>
  );
};

export default ContractList;
