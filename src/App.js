import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';

import { baselightTheme } from './theme/DefaultColors';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;

  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

  const token = localStorage.getItem('token');

  // Set the default headers for Axios
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
}

export default App;
