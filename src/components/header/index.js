import React from 'react';
import { Header, Logo, Button, Title, Home, Nav, Item } from './styles/header';
import logo from '../../images/logo3.png';

export default function HeaderComponent() {
  return (
    <Header>
      <Header.Home to="/">
        <Header.Logo />
        <Header.Title>
          King Of <span>Padel</span>
        </Header.Title>
      </Header.Home>
      <Header.Nav>
        <Header.Item to="/generator">Simulateur de tournoi</Header.Item>
      </Header.Nav>
    </Header>
  );
}

Header.Logo = function HeaderLogo() {
  return <Logo src={logo} />;
};

Header.Home = function HeaderHome({ children, ...restProps }) {
  return <Home {...restProps}>{children}</Home>;
};

Header.Nav = function HeaderNav({ children, ...restProps }) {
  return <Nav {...restProps}>{children}</Nav>;
};

Header.Item = function HeaderItem({ children, ...restProps }) {
  return <Item {...restProps}>{children}</Item>;
};

Header.Title = function HeaderTitle({ children }) {
  return <Title>{children}</Title>;
};

Header.Button = function HeaderButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};
