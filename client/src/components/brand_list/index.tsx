import { useState, Dispatch, SetStateAction } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useAppSelector } from 'service/store/index.types';

type Props = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
};

const BrandsList = ({ searchValue, setSearchValue }: Props) => {
  const { brands } = useAppSelector((store) => store.general);
  const searchResults = brands.filter((brand) => {
    return brand.name.toString().toLowerCase().includes(searchValue.toLowerCase());
  });
  const list = searchResults.map((brand) => {
    return (
      searchValue !== '' &&
      searchValue !== brand.name && (
        <ListGroup.Item
          onClick={() => {
            setSearchValue(brand.name);
          }}
          action
          key={brand._id}>
          {brand.name}
        </ListGroup.Item>
      )
    );
  });
  return <ListGroup style={{ position: 'absolute', top: 75 }}>{list}</ListGroup>;
};

export default BrandsList;
