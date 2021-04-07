import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

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
    primary: '#004AAD',
    secondary: '#de5149',
    primaryDarker: '#07408c',
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

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
