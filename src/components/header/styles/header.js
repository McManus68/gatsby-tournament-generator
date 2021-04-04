import styled, { css } from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  height: 80px;
  padding: 0rem 2rem;
  background: ${(props) => props.theme.header.bg};
`;

export const Logo = styled.img`
  width: 80px;
  height: auto;
`;
