import styled, { css } from 'styled-components/macro';
import MatButton from '@material-ui/core/Button';
import { Link } from 'gatsby';

export const Header = styled.header`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  height: 80px;
  padding: 0 1rem;
  background: ${(props) => props.theme.header.bg};
  box-shadow: 0px 0px 4px 3px ${(props) => props.theme.primary};
`;

export const Logo = styled.img`
  width: 75px;
  height: auto;
`;

export const Button = styled(MatButton)`
  margin: 0 5rem;
  .MuiButton-outlinedPrimary {
    color: white;
  }
`;

export const Home = styled(Link)`
  display: flex;
  justify-content: flex-start;
  text-decoration: none;
`;

export const Nav = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
`;

export const Item = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.1rem;
  height: 100%;
  color: ${(props) => props.theme.fg};

  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.primary};
  text-transform: uppercase;

  span {
    color: ${(props) => props.theme.fg};
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  .MuiInputBase-root,
  .MuiFormHelperText-root,
  .MuiSelect-icon {
    color: white;
  }

  .MuiButton-outlinedPrimary {
    color: white;
    margin: 0 1rem;
  }
`;
