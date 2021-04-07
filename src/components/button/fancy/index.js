import React from 'react';
import { Fancy, Vertical, Horizontal } from './styles/fancy';

export default function FancyButton({ children, ...restProps }) {
  return (
    <Fancy {...restProps}>
      {children}
      <Horizontal />
      <Vertical />
    </Fancy>
  );
}
