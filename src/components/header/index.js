import React from 'react';
import { Container, Logo } from './styles/header';
import logo from '../../images/logo.png';

export default function Header() {
  return (
    <Container>
      <Header.Logo />
    </Container>
  );
}

Header.Logo = function HeaderLogo() {
  return <Logo src={logo} />;
};
