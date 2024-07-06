import { ModalType } from '../../service/slices/modal/index.types';
import Modal from '../modal';
import ProviderList from '../provider_list';
import ContractList from '../contract_list';
import { useDispatch } from 'react-redux';
import {
  setActiveProvider,
  setContract,
  setProduct,
  setProvider,
  updateProductDetails,
} from '../../service/slices/receipts';
import { useAppSelector } from '../../service/store/index.types';
import { closeModal } from '../../service/slices/modal';
import ProductList from '../product_list';
import { v4 as uuidv4 } from 'uuid';
import ProductDetails from '../product_details';
import Warning from '../warning';
import { TNomenclatureProduct } from 'service/slices/receipts/index.types';
import UserCreate from '../user_create';
import { createUser } from '../../utils/api';
import { resetFormData } from '../../service/slices/new_user';
import { UserWithTokens } from 'service/slices/users/index.types';
import { addNewUser } from 'service/slices/users';

const ModalSwitch = () => {
  const { provider, contract } = useAppSelector((store) => store.receipts.newReceipt.temporaryData);
  const { activeProduct } = useAppSelector(
    (store) => store.receipts.newReceipt.temporaryData.product
  );
  const { name, email, role, password, passport } = useAppSelector((store) => store.newUser);
  const { productDetails } = useAppSelector(
    (store) => store.receipts.newReceipt.temporaryData.product
  );
  const { type } = useAppSelector((state) => state.modal);
  const { products } = useAppSelector((state) => state.general);
  const dispatch = useDispatch();
  const product = products.find(
    (product) => activeProduct && activeProduct.uniqueListId === product.uniqueListId
  ) as TNomenclatureProduct;
  const deleteProductAction = useAppSelector((state) => state.modal.action);
  return type === ModalType.PROVIDER ? (
    <Modal
      action={() => {
        provider.activeProvider && dispatch(setProvider(provider.activeProvider));
        dispatch(closeModal());
        dispatch(setActiveProvider(null));
      }}
      title={'Выбрать поставщика'}>
      <ProviderList />
    </Modal>
  ) : type === ModalType.CONTRACT ? (
    <Modal
      action={() => {
        contract.activeContract && dispatch(setContract(contract.activeContract.name));
        dispatch(closeModal());
      }}
      title={'Выбрать документ'}>
      <ContractList />
    </Modal>
  ) : type === ModalType.PRODUCT ? (
    <Modal
      title={'Выбрать товар'}
      action={() => {
        const uniqueListId = uuidv4();
        dispatch(
          setProduct({
            ...product,
            price: 0,
            amount: 0,
            country: '',
            customDeclaration: '',
            location: '',
            uniqueListId,
          })
        );
      }}>
      <ProductList />
    </Modal>
  ) : type === ModalType.PRODUCT_DETAILS ? (
    <Modal
      title={`Внесите данные для товара: ${product.name}`}
      action={() => {
        dispatch(
          updateProductDetails({
            ...product,
            ...productDetails,
            price: +productDetails.price,
            amount: +productDetails.amount,
          })
        );
      }}
      actionButtonText="Сохранить">
      <ProductDetails />
    </Modal>
  ) : type === ModalType.WARNING ? (
    <Modal
      title={`Удаление`}
      action={() => {
        deleteProductAction && dispatch(deleteProductAction);
        dispatch(closeModal());
      }}
      actionButtonText="Да">
      <Warning text={'Вы точно хотите удалить товар?'} />
    </Modal>
  ) : type === ModalType.SAVING ? (
    <Modal title={`Сохранение`} action={() => {}} actionButtonText="Да">
      <Warning text={'Вы точно хотите провести поступление'} />
    </Modal>
  ) : type === ModalType.USER ? (
    <Modal
      title={`Добавьте пользователя`}
      action={() => {
        if (!role) {
          return console.log('error');
        }
        createUser({ name, email, role, password, passport }).then(
          (data: { status: string; data: UserWithTokens }) => {
            dispatch(addNewUser(data.data));
            dispatch(resetFormData());
            dispatch(closeModal());
          }
        );
      }}
      actionButtonText={'Создать'}>
      <UserCreate />
    </Modal>
  ) : null;
};

export default ModalSwitch;
