import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const GlobalStyles = createGlobalStyle`
  html, body { 
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #161414;
    color: white;
    font-size: 1rem; 
  }
`;

const Theme = ({ children }) => {
  const theme = {
    primary: '#0086C0',
    secondary: '#D63CA0',
    fg: 'white',
    bracket: {
      bg: 'white',
      bgDarker: 'rgb(222,229,225)',
      fg: '#2d2525',
      winner: '#247214',
      looser: '#d0151d',
      border: '#f0f2f2',
      gapX: '3rem',
      gapY: '1rem',
      gridWidth: '20rem',
      teamHeight: '2.5rem',
    },
    header: {
      bg: 'black',
    },
  };

  const muiTheme = createMuiTheme({
    palette: {
      primary: {
        main: theme.primary,
      },
      secondary: {
        main: theme.secondary,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeProvider>
  );
};

export default Theme;
