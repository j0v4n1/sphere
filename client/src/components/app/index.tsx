import Navbar from '../navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth, Nomenclature, Orders, ReceiptList, Receipt, Users } from '../../pages';
import { useAppDispatch, useAppSelector } from 'service/store/index.types';
import Spinner from 'react-bootstrap/Spinner';
import { useEffect } from 'react';
import { getUsersThunk } from '../../service/slices/users';
import { getData } from '../../service/slices/general';

const App = () => {
  const { role } = useAppSelector((store) => store.user);
  const { isLogout } = useAppSelector((store) => store.general);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersThunk());
    dispatch(getData());
  }, []);

  return (
    <BrowserRouter>
      {isLogout ? (
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
            height: '100vh',
            position: 'absolute',
            width: '100%',
            top: 0,
            right: 0,
          }}>
          <Spinner />
        </div>
      ) : null}
      <Navbar role={role} />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/receipts" element={<ReceiptList />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
        <Route path="/nomenclature" element={<Nomenclature />} />
        <Route path="/receipts/add" element={<Receipt />} />
        <Route path="/receipts/:receiptId" element={<Receipt />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
