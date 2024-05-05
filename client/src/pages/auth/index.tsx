import { Button } from 'react-bootstrap';
import styles from './index.module.css';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../service/store/index.types';
import { getUsersThunk } from '../../service/slices/users';
import { loginUser } from '../../utils/api';
import { setUser } from '../../service/slices/user';
import { useNavigate } from 'react-router-dom';
import { Role } from '../../components/navbar/index.types';

const Auth = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users } = useAppSelector((store) => store.users);

  useEffect(() => {
    dispatch(getUsersThunk());
  }, []);

  const selectOptions = users.map((user) => {
    return (
      <option key={user._id} value={user.name}>
        {user.name} {user.role}
      </option>
    );
  });

  const navigator = (role: string) => {
    switch (role) {
      case Role.USER:
        navigate('/receipts');
        break;
      case Role.ADMIN:
        navigate('/users');
        break;
      case Role.SUPER_USER:
        navigate('/receipts');
        break;
      default:
        break;
    }
  };

  const handleLogin = () => {
    const user = users.find((user) => user.name === login);
    user &&
      loginUser({ _id: user._id, password })
        .then(({ data }) => {
          if (data.status === 'success') {
            dispatch(setUser(data.data));
            navigator(data.data.role);
          } else if (data.status === 'success') {
            throw new Error();
          }
        })
        .catch((err) => console.log(err));
  };

  return (
    <>
      <div className={styles.wrapper}>Добро пожаловать в Сферу - программу для работы с ЭДО.</div>
      <Form className={styles.form}>
        <h1 className={styles.title}>Пожалуйста авторизуйтесь:</h1>
        <Form.Group className={styles.group}>
          <Form.Label htmlFor="inputPassword5">Логин:</Form.Label>
          <Form.Select
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            htmlSize={1}
            size="sm">
            <option hidden value="default">
              Выберите аккаунт
            </option>
            {selectOptions}
          </Form.Select>
        </Form.Group>
        <Form.Group className={styles.group}>
          <Form.Label htmlFor="inputPassword">Пароль:</Form.Label>
          <Form.Control
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            id="inputPassword"
          />
          <Form.Text id="passwordHelpBlock" muted>
            Ваш пароль должен быть длиной от 8 до 20 символов, содержать буквы и цифры, и не должен
            содержать пробелов, специальных символов или эмодзи.
          </Form.Text>
        </Form.Group>
        <Button onClick={handleLogin}>Войти</Button>
      </Form>
    </>
  );
};

export default Auth;
