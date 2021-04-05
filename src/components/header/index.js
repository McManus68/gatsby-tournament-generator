import React from 'react';
import { Header, Logo, Button, Title } from './styles/header';
import logo from '../../images/logo3.png';

export default function HeaderComponent() {
  return (
    <Header>
      <Header.Logo />
      <Header.Title>
        King Of <span>Padel</span>
      </Header.Title>
    </Header>
  );
}

Header.Logo = function HeaderLogo() {
  return <Logo src={logo} />;
};

Header.Title = function HeaderTitle({ children }) {
  return <Title>{children}</Title>;
};

Header.Button = function HeaderButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};
