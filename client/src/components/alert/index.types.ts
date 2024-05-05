import React from 'react';

export type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
};
