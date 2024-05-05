import { Button, Modal as ModalBootstrap } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../service/store/index.types';
import { closeModal } from '../../service/slices/modal';
import { Props } from './index.types';
import styles from './index.module.css';

const Modal = ({ title, children, action, actionButtonText = 'Выбрать' }: Props) => {
  const { isOpen } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(closeModal());
  };

  return (
    <ModalBootstrap
      show={isOpen}
      onHide={close}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <ModalBootstrap.Header closeButton>
        <ModalBootstrap.Title id="contained-modal-title-vcenter">{title}</ModalBootstrap.Title>
      </ModalBootstrap.Header>
      <ModalBootstrap.Body className={styles.wrapper}>{children}</ModalBootstrap.Body>
      <ModalBootstrap.Footer>
        <Button onClick={action}>{actionButtonText}</Button>
        <Button onClick={close}>Закрыть</Button>
      </ModalBootstrap.Footer>
    </ModalBootstrap>
  );
};

export default Modal;
