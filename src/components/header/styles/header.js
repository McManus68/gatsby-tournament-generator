import styled, { css } from 'styled-components/macro';

import MatButton from '@material-ui/core/Button';

export const Header = styled.header`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  height: 80px;
  padding: 0rem 2rem;
  background: ${(props) => props.theme.header.bg};
  box-shadow: 0px 0px 4px 3px ${(props) => props.theme.primary};
`;

export const Logo = styled.img`
  width: 75px;
  height: auto;
`;

export const Button = styled(MatButton)`
  color: white;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.primary};
  text-transform: uppercase;

  span {
    color: ${(props) => props.theme.fg};
  }
`;
