import Form from 'react-bootstrap/Form';
import { Button, Col, Row } from 'react-bootstrap';
import { Role } from '../navbar/index.types';
import { generatePassword } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../service/store/index.types';
import { setFormData } from '../../service/slices/new_user';

export default function UserCreate() {
  const { name, password, passport, email } = useAppSelector((store) => store.newUser);
  const dispatch = useAppDispatch();

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="name">ФИО</Form.Label>
        <Form.Control
          onChange={(event) => {
            dispatch(setFormData({ value: event.target.value, key: 'name' }));
          }}
          value={name}
          id="name"
          type="name"
        />
      </Form.Group>
      <Row className="d-flex align-items-end justify-content-between">
        <Col>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Пароль</Form.Label>
            <Form.Control
              onChange={(event) => {
                dispatch(setFormData({ value: event.target.value, key: 'password' }));
              }}
              value={password}
              id="password"
              type="text"
            />
          </Form.Group>
        </Col>
        <Col className="d-flex justify-content-end mb-3">
          <Button
            onClick={() => {
              const password = generatePassword();
              dispatch(setFormData({ value: password, key: 'password' }));
            }}>
            Сгенерировать пароль
          </Button>
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="email">Электронная почта</Form.Label>
        <Form.Control
          onChange={(event) => {
            dispatch(setFormData({ value: event.target.value, key: 'email' }));
          }}
          value={email}
          id="email"
          type="email"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="role">Роль</Form.Label>
        <Form.Select
          onChange={(event) => {
            dispatch(setFormData({ value: event.target.value, key: 'role' }));
          }}
          id="role"
          defaultValue="user">
          <option value={Role.USER}>Пользователь</option>
          <option value={Role.ADMIN}>Администратор</option>
          <option value={Role.SUPER_USER}>Супер пользователь</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="passport">Паспортные данные</Form.Label>
        <Form.Control
          onChange={(event) => {
            dispatch(setFormData({ value: event.target.value, key: 'passport' }));
          }}
          value={passport}
          id="passport"
          as="textarea"
          rows={3}
        />
      </Form.Group>
    </Form>
  );
}
