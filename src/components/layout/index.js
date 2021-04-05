import React from 'react';
import { Layout } from './styles/layout';
import Header from '../header';
import Footer from '../footer';

export default function LayoutComponent({ children }) {
  return (
    <Layout>
      <Header />
      <main>{children}</main>
      <Footer />
    </Layout>
  );
}
