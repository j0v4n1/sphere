import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Props } from './index.types';
import { useState } from 'react';
import { addBrand, addProduct } from 'utils';
import Alert from 'components/alert';
import BrandsList from 'components/brand_list';

const AddProductToNomenclature = ({ isOpenModal, setIsOpenModal }: Props) => {
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [unit, setUnit] = useState('ед.');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loadingType, setLoadingType] = useState<'Brand' | 'Product' | null>(null);
  const closeModal = () => setIsOpenModal(false);
  return (
    <>
      <Modal
        show={isOpenModal}
        onHide={closeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Добавление товара</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="SKU">Код товара</Form.Label>
          <Form.Control
            onChange={(event) => {
              setSku(event.target.value);
            }}
            value={sku}
            type="text"
            id="SKU"
          />
          <Form.Label htmlFor="name">Наименование товара</Form.Label>
          <Form.Control
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={name}
            type="text"
            id="name"
          />
          <Alert show={showAlert} setShow={setShowAlert} text="Брэнд добавлен" />
          <Row>
            <Col style={{ position: 'relative' }}>
              <Form.Label htmlFor="brand">Брэнд зч</Form.Label>
              <Form.Control
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
                value={brand}
                type="text"
                id="brand"
              />
              <BrandsList setSearchValue={setBrand} searchValue={brand} />
            </Col>
            <Col
              style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
              <Button
                disabled={loading && loadingType === 'Brand'}
                onClick={() => {
                  setLoading(true);
                  setLoadingType('Brand');
                  addBrand(brand)
                    .then((data: { status: string; brand: string }) => {
                      if (data.status === 'success') {
                        setShowAlert(true);
                        setLoading(false);
                        setLoadingType(null);
                        setBrand('');
                      } else {
                        console.log('error');
                      }
                    })
                    .catch(() => {
                      console.log('error');
                    });
                }}>
                {loading && loadingType === 'Brand' ? 'Добавление...' : 'Добавить'}
              </Button>
              <Button>Удалить</Button>
            </Col>
            <Col>
              <Form.Label htmlFor="unit">Единица измерения</Form.Label>
              <Form.Select
                onChange={(event) => {
                  setUnit(event.target.value);
                }}
                value={unit}
                id="unit">
                <option>ед.</option>
                <option>л.</option>
                <option>уп.</option>
              </Form.Select>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={loading && loadingType === 'Product'}
            onClick={() => {
              setLoading(true);
              setLoadingType('Product');
              addProduct({ sku, name, brand, unit }).then((data) => {
                if (data) {
                  setLoading(false);
                  setLoadingType(null);
                  setSku('');
                  setName('');
                  setBrand('');
                  setUnit('ед.');
                  closeModal();
                } else {
                  console.log('error');
                }
              });
            }}>
            {loading && loadingType === 'Product' ? 'Сохранение...' : 'Сохранить'}
          </Button>
          <Button onClick={closeModal}>Закрыть</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddProductToNomenclature;
