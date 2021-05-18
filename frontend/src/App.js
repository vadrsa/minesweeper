import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import api from 'src/api';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {api.isLoggedIn()? 
        useRoutes(routes.loggedInRoutes):
        useRoutes(routes.routes)
      }
    </ThemeProvider>
  );
};

export default App;
