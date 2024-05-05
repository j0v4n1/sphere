import React from 'react';

export type Props = {
  title: string;
  actionButtonText?: string;
  children: React.ReactNode;
  action: () => void;
};
