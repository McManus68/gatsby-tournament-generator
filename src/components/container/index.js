import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 600px;
  max-width: 1000px;
`;

export default function ContainerComponent({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}
