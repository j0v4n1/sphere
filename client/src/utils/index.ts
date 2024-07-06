import { jsonDataReceipts } from 'service/slices/receipts/index.types';
import { BASE_URL } from '../constants';
import { NavigateFunction } from 'react-router-dom';
import { Role } from '../components/navbar/index.types';

const checkResponse = (response: Response | Response[]) => {
  if (Array.isArray(response)) {
    const promises = response.map((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    });
    return Promise.all(promises);
  } else {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }
};

export const fetchReceipts = async (): Promise<jsonDataReceipts> => {
  const data = await fetch(`${BASE_URL}/receipts`);
  return checkResponse(data);
};

export const generateDate = (today: Date) => {
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear().toString().slice(-2);
  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;
  return `${formattedDay}.${formattedMonth}.${year}`;
};

export const getAllData = async () => {
  const providers = await fetch(`${BASE_URL}/providers`);
  const brands = await fetch(`${BASE_URL}/brands`);
  const products = await fetch(`${BASE_URL}/products`);
  return checkResponse([providers, brands, products]);
};

export const addContractToProvider = async (
  id: string,
  contract: { _id: string; name: string }
) => {
  const data = await fetch(`${BASE_URL}/providers/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(contract),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return checkResponse(data);
};

export const addProduct = async (product: {
  sku: string;
  name: string;
  brand: string;
  unit: string;
}) => {
  const data = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return checkResponse(data);
};

export const addBrand = async (brand: string) => {
  const data = await fetch(`${BASE_URL}/brands`, {
    method: 'POST',
    body: JSON.stringify({ name: brand }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return checkResponse(data);
};

export const generatePassword = (options?: { length: number }): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const passwordLength = options ? options.length : 10;
  const generateRandomChar = () => {
    return chars[Math.floor(Math.random() * chars.length)];
  };
  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    password += generateRandomChar();
  }
  return password;
};

export const navigator = (role: string | null, navigate: NavigateFunction) => {
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
    case null:
      navigate('/');
      break;
    default:
      break;
  }
};
