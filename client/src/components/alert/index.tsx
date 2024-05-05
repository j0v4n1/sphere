import { Alert as AlertBootstrap, Button } from 'react-bootstrap';
import { Props } from './index.types';

const Alert = ({ text, setShow, show }: Props) => {
  return (
    <AlertBootstrap className="mt-3" show={show} variant="success">
      <AlertBootstrap.Heading>{text}</AlertBootstrap.Heading>
      <div className="d-flex justify-content-end">
        <Button onClick={() => setShow(false)} variant="outline-success">
          Закрыть
        </Button>
      </div>
    </AlertBootstrap>
  );
};

export default Alert;
