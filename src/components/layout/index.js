import React from 'react';
import { Layout } from './styles/layout';
import styled from 'styled-components';
import Header from '../header';
import Footer from '../footer';

const StyledMain = styled.main`
  height: 90vh;
`;

export default function LayoutComponent({ children }) {
  return (
    <Layout>
      <Header />
      <StyledMain>{children}</StyledMain>
      <Footer />
    </Layout>
  );
}
