import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import api from 'src/api';


const App = () => {
  const routing = useRoutes(routes(api.isLoggedIn()));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
