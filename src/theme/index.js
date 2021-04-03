import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html, body { 
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: black;
    color: white;
    font-size: 1rem;
  }
`;

const Theme = ({ children }) => {
  const theme = {
    bracket: {
      bg: 'white',
      fg: '#2d2525',
      winner: '#60c645',
      looser: 'yellow',
      border: '#f0f2f2',
      gridGap: '1rem',
      gridWidth: '22rem',
      teamHeight: '2rem',
      teamWidth: '16rem',
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
