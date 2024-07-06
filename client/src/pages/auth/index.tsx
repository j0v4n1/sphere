import { Button } from 'react-bootstrap';
import styles from './index.module.css';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../service/store/index.types';
import { authenticate, loginUser } from '../../utils/api';
import { navigator } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../service/slices/user';
import Spinner from 'react-bootstrap/Spinner';

const Auth = () => {
  const [login, setLogin] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isErrorAuth, setIsErrorAuth] = useState(false);
  const [password, setPassword] = useState('');

  const { users, loading } = useAppSelector((store) => store.users);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    authenticate()
      .then(({ data }) => {
        if (data.status === 'failure') {
          setIsAuth(true);
          return;
        }
        setIsAuth(true);
        dispatch(setUser(data.data));
        navigator(data.data.role, navigate);
      })
      .catch(() => {
        console.log('ошибка');
      });
  }, []);

  const selectOptions = users.map((user) => {
    return (
      <option key={user._id} value={user.name}>
        {user.name} {user.role}
      </option>
    );
  });

  const handleLogin = () => {
    setIsChecking(true);
    const user = users.find((user) => user.name === login);
    user &&
      loginUser({
        _id: user._id,
        name: user.name,
        email: user.email,
        passport: user.passport,
        password,
      })
        .then(({ data }) => {
          if (data.status === 'failure') {
            throw new Error();
          }
          setIsChecking(false);
          setIsErrorAuth(false);
          const { refreshToken, ...userData } = data.data;
          localStorage.setItem('refreshToken', refreshToken);
          dispatch(setUser(userData));
          navigator(data.data.role, navigate);
        })
        .catch((err) => {
          if (err.response.data === 'Пользователь не авторизован') {
            setIsErrorAuth(true);
          }
        });
  };

  return loading || !isAuth ? (
    <div
      style={{
        height: 'calc(100vh - 56px)',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Spinner />
    </div>
  ) : (
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
            isInvalid={isErrorAuth}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            id="inputPassword"
          />
          <Form.Text id="passwordHelpBlock" muted>
            {isErrorAuth
              ? 'Пароль набран неверно'
              : ' Ваш пароль должен быть длиной от 8 до 20 символов, содержать буквы и цифры, и не должен\n' +
                '            содержать пробелов, специальных символов или эмодзи.'}
          </Form.Text>
        </Form.Group>
        <Button disabled={isChecking} onClick={handleLogin}>
          {isChecking ? 'Входим...' : 'Войти'}
        </Button>
      </Form>
    </>
  );
};

export default Auth;
