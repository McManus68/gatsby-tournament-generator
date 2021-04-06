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
  margin: 0 5rem;
  .MuiButton-outlinedPrimary {
    color: white;
  }
`;

export const Left = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const Right = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
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
