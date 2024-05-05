import Navbar from '../navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth, Nomenclature, Orders, ReceiptList, Receipt, Users } from '../../pages';
import { useAppDispatch, useAppSelector } from 'service/store/index.types';
import { useEffect } from 'react';
import { getData } from '../../service/slices/general';

const App = () => {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((store) => store.user);

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <BrowserRouter>
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
