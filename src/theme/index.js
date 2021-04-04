import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html, body { 
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #35383C;
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
      gridGap: '2rem',
      gridWidth: '22rem',
      teamHeight: '2.5rem',
      teamWidth: '16rem',
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
